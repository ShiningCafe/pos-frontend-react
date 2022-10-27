import React, { useState } from "react";
import Card from "../../../components/ui/Card";
import {
  Alert,
  ToggleSwitch,
  Button,
  Table,
  TextInput,
  Label,
} from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { db } from "../../../app/db";
import axios from "axios"

const Debug = () => {
  const [mode, setMode] = useState(false);
  const [listData, setListData] = useState([]);

  async function listALLData(category) {
    setListData(await db[category].toArray());
  }

  async function cleanAllData() {
    const check = confirm("確認清除所有資料，未同步至雲端的將會消失");
    if (check) {
      await db.commodities.clear();
      await db.orders.clear();
      alert("清除完成");
    }
  }

  // 列印

  const [usePrintTag, setUsePrintTag] = useState(
    localStorage.getItem("usePrintTag") === "true"
  );
  const [printerURL, setPrinterURL] = useState(
    localStorage.getItem("printerURL") ?? ""
  );

  function testPrint () {
    // 測試列印
    const testData = {
            "menu": [
                {
                    "type": "item",
                    "ice": "微冰",
                    "suger": "微糖",
                    "name": "金萱青茶",
                    "price": 30
                }
            ],
            "serial": 999,
            "total": 1
        }
    axios.post(`${printerURL}/print-tag/multi`, testData).then(() => {
      alert('列印成功')
    }).catch(() => {
      alert('列印失敗了')
    })
  }

  return (
    <div className="px-4 pt-6 pb-2 grid gap-2">
      <Card>
        <Alert
          icon={HiInformationCircle}
          color="warning"
          additionalContent={
            <React.Fragment>
              在這邊的任何操作都可能會造成您的資料遺失。
              <br />
              如果您不知道您要做什麼，請不要操作這裡的項目。
            </React.Fragment>
          }
        >
          <h3 className="text-lg font-medium text-yellow-700 dark:text-yellow-800">
            注意！這是開發者模式
          </h3>
        </Alert>
        <div className="mt-5">
          <ToggleSwitch
            checked={mode}
            onChange={() => setMode(!mode)}
            label="顯示開發者模式"
          />
        </div>
      </Card>
      {mode ? (
        <React.Fragment>
          <Card>
            <p className="mb-5">資料儲存（本地）</p>
            <div className="grid gap-4">
              <Button color="failure" onClick={() => cleanAllData()}>
                清除機器上所有資料（已同步的仍可被同步回來）
              </Button>
              <Button onClick={() => listALLData("commodities")}>
                列出所有資料（商品）
              </Button>
              {/* <Button onClick={() => listALLData('orders')}>列出所有資料（訂單）</Button> */}
              {listData.length > 0 ? (
                <React.Fragment>
                  <Button color="light" onClick={() => setListData([])}>
                    收起列表
                  </Button>
                  <Table>
                    <Table.Head>
                      <Table.HeadCell>操作(TODO)</Table.HeadCell>
                      <Table.HeadCell>資料</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                      {listData.map((item) => {
                        return (
                          <Table.Row key={item._id}>
                            <Table.Cell className="whitespace-nowrap">
                              {item.deletedAt ? (
                                <Button size="xs" color="warning" disabled>
                                  還原
                                </Button>
                              ) : (
                                <Button size="xs" disabled>
                                  刪除
                                </Button>
                              )}
                            </Table.Cell>
                            <Table.Cell>{JSON.stringify(item)}</Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                </React.Fragment>
              ) : (
                ""
              )}
            </div>
          </Card>
          <Card>
            <p>列印功能</p>
            <div className="my-3">
              <Alert
                icon={HiInformationCircle}
                color="warning"
                additionalContent={
                  <React.Fragment>
                    需要有安裝特定程式(開發中)的後端伺服器才能使用這個功能。
                  </React.Fragment>
                }
              >
                <h3 className="text-lg font-medium text-yellow-700 dark:text-yellow-800">
                  注意！
                </h3>
              </Alert>
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="printerURL" value="列印伺服器網址" />
              </div>
              <TextInput
                id="printerURL"
                type="text"
                placeholder="http://example.com:port"
                defaultValue={printerURL}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    console.log(event.target.value);
                    localStorage.setItem("printerURL", event.target.value);
                    setPrinterURL(event.target.value);
                  }
                }}
              />
            </div>
            <div className="my-5">
              <ToggleSwitch
                checked={usePrintTag}
                onChange={(event) => {
                  localStorage.setItem("usePrintTag", event);
                  setUsePrintTag(!usePrintTag);
                }}
                label="列印標籤"
              />
            </div>
            <div>
              <Button onClick={() => testPrint()}>測試列印</Button>
            </div>
          </Card>
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default Debug;
