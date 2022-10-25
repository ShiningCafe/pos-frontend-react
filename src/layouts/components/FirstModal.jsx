import React from "react";
import { Modal } from "flowbite-react";
import Button from "../../components/ui/Button";
import { useState, useEffect } from "react";
import { db } from "../../app/db";
import { nanoid } from "@reduxjs/toolkit";

const FirstModal = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("init")) setShow(true)
  }, []);

  function submit() {
    localStorage.setItem("init", true);
    initDB();
    initLocalStorage();
    setShow(false);
  }

  function submitSync () {
    localStorage.setItem("init", true);
    setShow(false);
  }

  async function initDB() {
    await db.commodities.clear();
    await db.commodities.bulkAdd([
      {
        _id: nanoid(),
        name: "多多綠",
        categories: ["熱門商品", "特調", "茶類"],
        price: 50,
        specification: [
          {
            name: "甜度",
            type: "single",
            required: true,
            value: [
              { name: "正常甜" },
              { name: "半糖" },
              { name: "微糖" },
              { name: "無糖" },
            ],
          },
          {
            name: "冰塊",
            type: "single",
            required: true,
            value: [
              { name: "正常冰" },
              { name: "少冰" },
              { name: "微冰" },
              { name: "去冰" },
              { name: "溫" },
              { name: "熱", price: 10 },
            ],
          },
          {
            name: "加料",
            type: "multi",
            value: [
              { name: "珍珠", price: 5 },
              { name: "椰果", price: 5 },
            ],
          },
        ],
      },
      {
        _id: nanoid(),
        name: "超級無敵紅茶",
        categories: ["熱門商品", "茶類"],
        price: 40,
        specification: [
          {
            name: "甜度",
            type: "single",
            required: true,
            value: [
              { name: "正常甜" },
              { name: "半糖" },
              { name: "微糖" },
              { name: "無糖" },
            ],
          },
          {
            name: "冰塊",
            type: "single",
            required: true,
            value: [
              { name: "正常冰" },
              { name: "少冰" },
              { name: "微冰" },
              { name: "去冰" },
              { name: "溫" },
              { name: "熱", price: 10 },
            ],
          },
          {
            name: "加料",
            type: "multi",
            value: [
              { name: "珍珠", price: 5 },
              { name: "椰果", price: 5 },
            ],
          },
        ],
      },
      {
        _id: nanoid(),
        name: "高級的金萱青",
        categories: ["茶類"],
        price: 80,
        specification: [
          {
            name: "甜度",
            type: "single",
            required: true,
            value: [
              { name: "正常甜" },
              { name: "半糖" },
              { name: "微糖" },
              { name: "無糖" },
            ],
          },
          {
            name: "冰塊",
            type: "single",
            required: true,
            value: [
              { name: "正常冰" },
              { name: "少冰" },
              { name: "微冰" },
              { name: "去冰" },
              { name: "溫" },
              { name: "熱", price: 10 },
            ],
          },
          {
            name: "加料",
            type: "multi",
            value: [
              { name: "珍珠", price: 5 },
              { name: "椰果", price: 5 },
            ],
          },
        ],
      },
      {
        _id: nanoid(),
        name: "烏龍茶",
        categories: [],
        price: 90,

        specification: [
          {
            name: "甜度",
            type: "single",
            required: true,
            value: [
              { name: "正常甜" },
              { name: "半糖" },
              { name: "微糖" },
              { name: "無糖" },
            ],
          },
          {
            name: "冰塊",
            type: "single",
            required: true,
            value: [
              { name: "正常冰" },
              { name: "少冰" },
              { name: "微冰" },
              { name: "去冰" },
              { name: "溫" },
              { name: "熱", price: 10 },
            ],
          },
          {
            name: "加料",
            type: "multi",
            value: [
              { name: "珍珠", price: 5 },
              { name: "椰果", price: 5 },
            ],
          },
        ],
      },
      {
        _id: nanoid(),
        name: "百香綠",
        categories: ["新鮮果汁"],
        price: 90,
        specification: [
          {
            name: "甜度",
            type: "single",
            required: true,
            value: [
              { name: "正常甜" },
              { name: "半糖" },
              { name: "微糖" },
              { name: "無糖" },
            ],
          },
          {
            name: "冰塊",
            type: "single",
            required: true,
            value: [
              { name: "正常冰" },
              { name: "少冰" },
              { name: "微冰" },
              { name: "去冰" },
              { name: "溫" },
              { name: "熱", price: 10 },
            ],
          },
          {
            name: "加料",
            type: "multi",
            value: [
              { name: "珍珠", price: 5 },
              { name: "椰果", price: 5 },
            ],
          },
        ],
      },
      {
        _id: nanoid(),
        name: "鮮橙綠",
        categories: ["新鮮果汁"],
        price: 90,
        specification: [
          {
            name: "甜度",
            type: "single",
            required: true,
            value: [
              { name: "正常甜" },
              { name: "半糖" },
              { name: "微糖" },
              { name: "無糖" },
            ],
          },
          {
            name: "冰塊",
            type: "single",
            required: true,
            value: [
              { name: "正常冰" },
              { name: "少冰" },
              { name: "微冰" },
              { name: "去冰" },
              { name: "溫" },
              { name: "熱", price: 10 },
            ],
          },
          {
            name: "加料",
            type: "multi",
            value: [
              { name: "珍珠", price: 5 },
              { name: "椰果", price: 5 },
            ],
          },
        ],
      },
      {
        _id: nanoid(),
        name: "鐵觀音奶茶",
        categories: ["奶茶"],
        price: 90,
        specification: [
          {
            name: "甜度",
            type: "single",
            required: true,
            value: [
              { name: "正常甜" },
              { name: "半糖" },
              { name: "微糖" },
              { name: "無糖" },
            ],
          },
          {
            name: "冰塊",
            type: "single",
            required: true,
            value: [
              { name: "正常冰" },
              { name: "少冰" },
              { name: "微冰" },
              { name: "去冰" },
              { name: "溫" },
              { name: "熱", price: 10 },
            ],
          },
          {
            name: "加料",
            type: "multi",
            value: [
              { name: "珍珠", price: 5 },
              { name: "椰果", price: 5 },
            ],
          },
        ],
      },
      {
        _id: nanoid(),
        name: "華碩G10CE搭配GTX1660Ti顯卡",
        categories: ["電競主機"],
        price: 28990,
        specification: [
          {
            name: "升級",
            type: "single",
            value: [
              {
                name: "升級顯卡3080Ti",
                price: 23999,
              },
              {
                name: "升級128G記憶體",
                price: 8999,
              },
            ],
            required: false,
          },
          {
            name: "加購",
            type: "multi",
            value: [
              {
                name: "金屬螺帽",
                price: 50,
              },
              {
                name: "鈦合金轉軸",
                price: 200,
              },
            ],
          },
        ],
      },
    ]);
    console.log("add complete");
  }

  function initLocalStorage() {
    const list = [
      {
        name: "電子材料組合",
        spec: [
          {
            name: "規格",
            type: "single",
            value: [
              {
                name: "X",
                price: null,
              },
              {
                name: "L",
                price: null,
              },
              {
                name: "M",
                price: null,
              },
              {
                name: "S",
                price: null,
              },
            ],
            required: true,
          },
          {
            name: "加購",
            type: "multi",
            value: [
              {
                name: "金屬螺帽",
                price: 50,
              },
              {
                name: "鈦合金轉軸",
                price: 200,
              },
            ],
          },
        ],
      },
      {
        name: "飲料組合1",
        spec: [
          {
            name: "甜度",
            type: "single",
            required: true,
            value: [
              {
                name: "正常甜",
              },
              {
                name: "半糖",
              },
              {
                name: "微糖",
              },
              {
                name: "無糖",
              },
            ],
          },
          {
            name: "冰塊",
            type: "single",
            required: true,
            value: [
              {
                name: "正常冰",
              },
              {
                name: "少冰",
              },
              {
                name: "微冰",
              },
              {
                name: "去冰",
              },
              {
                name: "溫",
              },
              {
                name: "熱",
                price: 10,
              },
            ],
          },
          {
            name: "加料",
            type: "multi",
            value: [
              {
                name: "珍珠",
                price: 5,
              },
              {
                name: "椰果",
                price: 5,
              },
            ],
          },
        ],
      },
    ];
    localStorage.setItem("specCommon", JSON.stringify(list));
  }

  return (
    <React.Fragment>
      <Modal show={show}>
        {/* <Modal.Header>
          開始使用
        </Modal.Header> */}
        <Modal.Body>
          <div className="space-y-6 pt-6">
            <p className="text-lg">您好，歡迎使用本系統 🎉</p>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-400">
              目前為早期測試版本，因此尚無資料同步至伺服器功能，所有資料都會存在您的設備上。注意：清除瀏覽器記錄將會導致資料消失。
            </p>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-400">
              本系統可做為桌面應用程式，並在無網路的環境狀態下正常使用。如需加到設備的桌面，可以從分享的選單選擇「加入主畫面
              」，電腦版Chrome瀏覽器的話則是在網址列的最後面進行安裝。
            </p>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-400">
              本系統為免費使用，功能尚不齊全敬請見諒。進度規劃及時程請詳見官方網站
            </p>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-400">
              🔥部分頁面功能繁雜在手機版上較難以排版，建議使用平板或是電腦操作🔥
            </p>
          </div>
          <hr className="my-5"/>
          <Button
            onClick={() => submit()}
            className="bg-violet-600 text-white font-bold hover:bg-violet-100"
          >
            了解，並建立範本
          </Button>
          <Button
            onClick={() => submitSync()}
            className="bg-violet-600 text-white font-bold hover:bg-violet-100"
          >
            不建立範本，從其他裝置同步資料
          </Button>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default FirstModal;
