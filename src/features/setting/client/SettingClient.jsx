import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
//
import { Avatar, Table, Button, Badge } from "flowbite-react";
import { HiUpload, HiClock, HiDownload } from "react-icons/hi";
//
import Card from "../../../components/ui/Card";
import GoogleButton from "react-google-button";
import Api from "../../../app/api";
//
import { activeNotify } from "../../../layouts/notifySlice";
import { useDispatch } from "react-redux";
import { useLiveQuery } from "dexie-react-hooks";
import _ from "lodash";
import { db } from "../../../app/db";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const SettingClient = () => {
  dayjs.extend(relativeTime);
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const api = new Api();
  const [unixtime, setUnixtime] = useState(parseInt(localStorage.getItem("syncDataVersion") ?? 0));
  const [isLogin, setIsLogin] = useState(false);
  const [isLatest, setIsLatest] = useState(true);
  const [user, setUser] = useState({
    _id: "",
    googleId: "",
    profilePicture: "",
    email: "",
  });
  //
  // onMounted
  //
  // 功能：驗證是否登入
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userDataLocalStorage = localStorage.getItem("user");
    if (userDataLocalStorage) setUser(userDataLocalStorage);
    if (token) {
      getUser(); // 從伺服器拿取 user 資料，用來更新頭貼、驗證 token 時效
      getHistories();
      setIsLogin(true);
    } else {
      // 拿取登入後重新導向後的網址參數
      // 範例：http://localhost:3000/setting/client?access_token=eyJhbGciOiJIU.....
      if (params.get("access_token")) {
        const token = params.get("access_token");
        localStorage.setItem("token", token);
        setTimeout(() => getUser(), 1500);
        setIsLogin(true);
      }
    }
  }, [unixtime]);

  function getUser() {
    api
      .get("users")
      .then((res) => {
        if (res.data.data[0]) {
          localStorage.setItem("user", JSON.stringify(res.data.data[0]));
          setUser(res.data.data[0]);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.reload();
      });
  }

  function getHistories() {
    api
      .get("upload-histories", { $limit: 1, "$sort[unixtime]": -1 })
      .then((res) => {
        if (res.data.data[0]) {
          if (parseInt(res.data.data[0].unixtime) <= unixtime)
          {
            // 本機與伺服器最新一致
            setIsLatest(true);
          } else {
            // 本機與伺服器最新資料不同步
            setIsLatest(false);
          }
        } else {
          // 伺服器上沒有資料
          setIsLatest(true);
        }
      });
  }

  const loginButton = (
    <div className="grid pt-5">
      {process.env.NODE_ENV === "production" ? (
        <GoogleButton
          className="justify-self-center"
          onClick={() =>
            (window.location.href =
              "https://sys-api.shiningcafe.com/oauth/google")
          }
        />
      ) : (
        // 開發環境
        <GoogleButton
          className="justify-self-center"
          onClick={() =>
            (window.location.href = "http://localhost:3030/oauth/google")
          }
        />
      )}
    </div>
  );
  const skeleton = (
    <div className="mt-5">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    </div>
  );
  //
  // 建構要上傳的List
  //
  const listInit = [
    {
      title: "商品資料",
      name: "commodities",
      create: [],
      update: [],
    },
    {
      title: "交易資料",
      name: "orders",
      create: [],
      update: [],
    },
  ];
  const [list, setList] = useState(listInit);
  const [timeFromLastUpdated, setTimeFromLastUpdated] = useState();
  useLiveQuery(async () => {
    const syncDataVersion = parseInt(localStorage.getItem("syncDataVersion"));
    const cloneList = _.cloneDeep(list);
    if (!syncDataVersion) {
      // 重未同步過
      for (let item of cloneList) {
        item.create = await db[item.name].toArray();
      }
    } else {
      setTimeFromLastUpdated(dayjs(new Date(syncDataVersion * 1000)).fromNow());
      for (let item of cloneList) {
        item.create = await db[item.name]
          .where("uploadedAt")
          .equals(0)
          .toArray();
        item.update = await db[item.name]
          .where("updatedAt")
          .above(syncDataVersion)
          .and((item) => item.uploadedAt !== 0)
          .toArray();
      }
    }
    setList(cloneList);
  });
  //
  // upload event
  //
  function uploadData() {
    // Notify
    dispatch(activeNotify({ type: "warning", message: "同步開始，請稍候" }));

    const nowUnixtime = Math.floor(new Date() / 1000);
    const promise = [];
    // 將資料同步至伺服器
    for (let category of list) {
      if (category.create.length > 0) {
        for (let item of category.create) {
          item.uploadedAt = nowUnixtime;
          db[category.name].update(item._id, { uploadedAt: nowUnixtime });
        }
        promise.push(
          api.post(category.name, category.create).then(() => {
            console.log(`${category.name} => 新增同步成功`);
          })
        );
      }
      if (category.update.length > 0) {
        for (let item of category.update) {
          item.uploadedAt = nowUnixtime;
          db[category.name].update(item._id, { uploadedAt: nowUnixtime });
          promise.push(
            api.put(category.name, item).then(() => {
              console.log(`${category.name} ${item._id} => 更新同步成功`);
            })
          );
        }
      }
    }

    // 處理同步結束的事件
    Promise.all(promise)
      .then(() => {
        // 當全部完成
        // 先記錄這次同步的時間
        return api.post("upload-histories", { unixtime: nowUnixtime });
      })
      .then(() => {
        localStorage.setItem("syncDataVersion", nowUnixtime);
        setUnixtime(nowUnixtime);
        setList(listInit);
        dispatch(activeNotify({ type: "success", message: "同步完成" }));
      })
      .catch((err) => {
        // 有失敗的話
        console.error(err);
        dispatch(activeNotify({ type: "error", message: "同步部分失敗" }));
      });
  }
  //
  // download event
  //
  function downloadData() {

    async function _getAPI(path, data, skip) {
      const perPage = 50;
      const newData = await api.get(path, {
        "uploadedAt[$gt]": unixtime,
        $limit: perPage,
        $skip: skip,
      });
      data = data.concat(newData.data.data);
      return newData.data.total - (skip + perPage) > 0
        ? await _getAPI(path, data, skip + perPage)
        : data;
    }
    for (let category of list) {
      _getAPI(category.name, [], 0).then(async (res) => {
        console.log(`從伺服器下載的 [${category.name}] 資料 =>`, res);
        if (res.length > 0) {
          const nowUnixtime =  Math.floor(new Date() / 1000);
          localStorage.setItem("syncDataVersion", nowUnixtime);
          setUnixtime(nowUnixtime);
        }
        // 將資料寫入本地
        for (let item of res) {
          const check = await db[category.name].get(item._id);
          // 修正早期版本 createAt 是存 2022-08-16T11:18:44.741Z 這種格式
          // if (typeof(item.createdAt) === 'string') item.createdAt = Math.floor(new Date(item.createdAt) / 1000);
          if (check) {
            // 已存在
            db[category.name].put(item);
          } else {
            // 不存在
            db[category.name].add(item);
          }
        }
      });
    }
  }

  return (
    <div className="px-4 pt-6 pb- 2">
      <div className="grid grid-cols-1 gap-2">
        <Card>
          <p>帳號資料</p>
          {!isLogin ? (
            loginButton
          ) : (
            <div className="mt-5">
              <Avatar img={user.profilePicture} rounded={true}>
                <div className="space-y-1 font-medium dark:text-white">
                  <div>{user.email}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    ID: {user._id}
                  </div>
                </div>
              </Avatar>
            </div>
          )}
        </Card>
        <Card>
          <div className="flex flex-wrap gap-2">
            <span>同步狀態</span>
            {timeFromLastUpdated ? (
              <Badge color="gray" icon={HiClock} className="self-center">
                上次同步：
                {timeFromLastUpdated}
              </Badge>
            ) : (
              ""
            )}
          </div>
          {!isLogin ? (
            skeleton
          ) : (
            <React.Fragment>
              <Table className="mt-5">
                <Table.Head>
                  <Table.HeadCell>類別</Table.HeadCell>
                  <Table.HeadCell>尚未同步-新增</Table.HeadCell>
                  <Table.HeadCell>尚未同步-更新</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {list.map((item) => {
                    return (
                      <Table.Row
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        key={`sync_table_${item.name}`}
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          <div className="flex items-center">
                            {item.create.length === 0 ? (
                              <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                            ) : (
                              <div className="h-2.5 w-2.5 rounded-full bg-red-400 mr-2"></div>
                            )}
                            {item.create.length}
                          </div>
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          <div className="flex items-center">
                            {item.update.length === 0 ? (
                              <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                            ) : (
                              <div className="h-2.5 w-2.5 rounded-full bg-red-400 mr-2"></div>
                            )}
                            {item.update.length}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
              <div className="grid mt-5">
                {isLatest ? (
                  // 是最新
                  list.some(
                    (el) => el.create.length > 0 || el.update.length > 0
                  ) ? (
                    // 且有能上傳的資料就顯示上傳按鈕
                    <Button
                      className="justify-self-center"
                      onClick={uploadData}
                    >
                      <HiUpload className="w-5 h-5 mr-2" />
                      上傳至伺服器
                    </Button>
                  ) : (
                    ""
                  )
                ) : (
                  // 不是最新則顯示下載按鈕
                  <Button
                    className="justify-self-center"
                    onClick={downloadData}
                  >
                    <HiDownload className="w-5 h-5 mr-2" />
                    從伺服器下載資料
                  </Button>
                )}
                {/* <Button className="justify-self-center" onClick={downloadData}>
                  <HiDownload className="w-5 h-5 mr-2" />
                  TEST從伺服器下載資料
                </Button> */}
              </div>
            </React.Fragment>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SettingClient;
