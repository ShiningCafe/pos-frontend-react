import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
// UI
import { Modal, Button, TextInput, } from "flowbite-react";
import { HiX } from 'react-icons/hi'
// Redux
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  createCommodityToIndexedDB,
  updateCommodityToIndexedDB,
  // deleteCommodityToIndexedDB,
} from "../commodity/commoditySlice";
// Component
import CategoryInput from "./CategoryInput";

const CommodityModal = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const [show, setShow] = useState(false);
  const [commodity, setCommodity] = useState({
    _id: nanoid(),
    name: "",
    price: "",
    categories: [],
    isCreate: true,
  });
  const categoryInputDiv = useRef();

  useImperativeHandle(ref, () => ({
    open(data) {
      if (data) {
        setCommodity(data);
        categoryInputDiv.current.init(data.categories);
      } else {
        setCommodity({
          _id: nanoid(),
          name: "",
          price: "",
          categories: [],
          isCreate: true,
        });
        categoryInputDiv.current.init([]);
      }
      setShow(true);
    },
  }));

  function close() {
    setShow(false);
  }

  function selectCategory(val) {
    setCommodity({ ...commodity, categories: val });
  }

  function submit(event) {
    event.preventDefault();
    let data = { ...commodity };
    data.price = parseInt(data.price)
    if (commodity.isCreate) {
      delete data.isCreate;
      const datetime = new Date();
      data.createdAt = Math.floor(datetime / 1000);
      dispatch(createCommodityToIndexedDB(data)).then(() => {
        close();
      });
    } else {
      console.log("data", data);
      dispatch(updateCommodityToIndexedDB(data)).then(() => {
        close();
      });
    }
  }

  // function copyItemEvent () {
  //   // 複製成新的商品
  //   let data = { ...commodity };
  //   data._id = nanoid();
  //   // 轉存 unix timestamp
  //   const datetime = new Date();
  //   data.createdAt = Math.floor(datetime / 1000);
  //   data.price = parseInt(data.price)
  //   dispatch(createCommodityToIndexedDB(data)).then(() => {
  //     close();
  //   });
  // }

  // function deleteItemEvent () {
  //   // 刪除商品
  //   let data = { ...commodity };
  //   dispatch(deleteCommodityToIndexedDB(data)).then(() => {
  //     close();
  //   });
  // }
  //
  return (
    <React.Fragment>
      <Modal show={show} onClose={close}>
        <form
          onSubmit={submit}
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        >
          <div className="flex justify-between border-b p-5">
            <div className="text-xl font-medium text-gray-900 dark:text-white self-center">
              商品管理
            </div>
            {!commodity.isCreate ? (
              <div className="inline-flex gap-1">
                {/* <Button size="xs" color="gray" onClick={() => copyItemEvent()}><HiDuplicate className="h-5 w-5"/></Button>
                <Button size="xs" color="gray" onClick={() => deleteItemEvent()}><HiTrash className="h-5 w-5" /></Button> */}
                <button size="xs" color="gray" onClick={() => navigate(`/setting/commodity/${commodity._id}`) }>進階設定</button>
                <Button size="xs" color="gray" onClick={close}><HiX className="h-5 w-5" /></Button>
              </div>
            ) : '' }
          </div>
          <Modal.Body>
              <div className="px-2 flex flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <span>名稱</span>
                  </div>
                  <TextInput
                    type="text"
                    required={true}
                    value={commodity.name}
                    onChange={(e) =>
                      setCommodity({ ...commodity, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <span>分類</span>
                  </div>
                  <CategoryInput
                    changeHandler={selectCategory}
                    ref={categoryInputDiv}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <span>價格</span>
                  </div>
                  <TextInput
                    type="number"
                    required={true}
                    value={commodity.price}
                    onChange={(e) =>
                      setCommodity({ ...commodity, price: e.target.value })
                    }
                  />
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">
              {commodity.isCreate ? "建立" : "修改"}
            </Button>
            <Button color="gray" onClick={close}>
              取消
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </React.Fragment>
  );
});

CommodityModal.displayName = "CommodityModal";
export default CommodityModal;
