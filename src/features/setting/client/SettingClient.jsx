import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
//
import { Avatar, Table, Button, Badge } from "flowbite-react";
import { HiUpload, HiClock } from "react-icons/hi";
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

const SettingClient = () => {
  const dispatch = useDispatch();
  const api = new Api();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    _id: "",
    googleId: "",
    profilePicture: "",
    email: "",
  });

  // onMounted 驗證是否登入
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userDataLocalStorage = localStorage.getItem("user");
    if (userDataLocalStorage) setUser(userDataLocalStorage);
    if (token) {
      // 之後要再驗證token時效
      api.get("users").then((res) => {
        if (res.data.data[0]) {
          localStorage.setItem("user", JSON.stringify(res.data.data[0]));
          setUser(res.data.data[0]);
        }
      });
      setIsLogin(true);
    } else {
      // 拿取登入後重新導向後的網址參數
      // http://localhost:3000/setting/client?access_token=eyJhbGciOiJIU.....
      const [params] = useSearchParams();
      if (params.get("access_token")) {
        const token = params.get("access_token");
        localStorage.setItem("token", token);
        setIsLogin(true);
      }
    }
  }, []);

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
  //
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
  const lastSyncAt = parseInt(localStorage.getItem("lastSyncAt"));
  useLiveQuery(async () => {
    const cloneList = _.cloneDeep(list);
    if (!lastSyncAt) {
      // 重未同步過
      for (let item of cloneList) {
        item.create = await db[item.name].toArray();
      }
    } else {
      for (let item of cloneList) {
        item.create = await db[item.name]
          .where("updatedAt")
          .equals(0)
          .toArray();
        item.update = await db[item.name]
          .where("updatedAt")
          .above(lastSyncAt)
          .toArray();
      }
    }
    setList(cloneList);
  });
  //
  // upload event
  //
  function uploadData() {
    const promise = [];
    for (let category of list) {
      if (category.create.length > 0) {
        promise.push(
          api.post(category.name, category.create).then(() => {
            console.log(`${category.name} => 新增同步成功`);
          })
        );
      }
      if (category.update.length > 0) {
        for (let item of category.update) {
          promise.push(
            api.put(category.name, item).then(() => {
              console.log(`${category.name} ${item._id} => 更新同步成功`);
            })
          );
        }
      }
    }
    dispatch(activeNotify({ type: "warning", message: "同步開始，請稍候" }));
    Promise.all(promise)
      .then(() => {
        // 當全部完成
        setList(listInit);
        localStorage.setItem("lastSyncAt", Math.floor(new Date() / 1000));
        dispatch(activeNotify({ type: "success", message: "同步完成" }));
      })
      .catch((err) => {
        // 有失敗的話
        console.error(err);
        dispatch(activeNotify({ type: "error", message: "同步部分失敗" }));
      });
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
            <Badge color="gray" icon={HiClock} className="self-center">
              3 days ago
            </Badge>
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
                <Button className="justify-self-center" onClick={uploadData} disabled={!list.some(el => el.create.length > 0 || el.update.length > 0)}>
                  <HiUpload className="w-5 h-5 mr-2" />
                  上傳至伺服器
                </Button>
              </div>
            </React.Fragment>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SettingClient;
