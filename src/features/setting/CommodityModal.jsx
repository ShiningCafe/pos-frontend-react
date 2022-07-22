import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Modal, Button, TextInput } from "flowbite-react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { createCommodityToIndexedDB, updateCommodityToIndexedDB } from '../commodity/commoditySlice'

import CategoryInput from "./CategoryInput";

const CommodityModal = forwardRef((props, ref) => {
  const dispatch = useDispatch()
  //
  const [show, setShow] = useState(false);
  const [commodity, setCommodity] = useState({
    _id: nanoid(),
    name: '',
    price: '',
    categories: [],
    isCreate: true
  });
  const categoryInputDiv = useRef()

  useImperativeHandle(ref, () => ({
    open(data) {
      if (data) {
        setCommodity(data)
        categoryInputDiv.current.init(data.categories)
      } else {
        setCommodity({
          _id: nanoid(),
          name: '',
          price: '',
          categories: [],
          isCreate: true
        })
        categoryInputDiv.current.init([])
      }
      setShow(true);
    },
  }));

  function close() {
    setShow(false);
  }

  function selectCategory (val) {
    setCommodity({ ...commodity, categories: val })
  }

  function submit (event) {
    event.preventDefault()
    let data = { ...commodity }
    if (commodity.isCreate) {
      delete data.isCreate
      data.createdAt = new Date()
      dispatch(createCommodityToIndexedDB(data)).then(() => {
        close()
      })
    } else {
      console.log('data', data)
      dispatch(updateCommodityToIndexedDB(data)).then(() => {
        close()
      })
    }
  }
  //
  return (
    <React.Fragment>
      <Modal show={show} onClose={close}>
        <form onSubmit={submit} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
        <Modal.Header>商品管理</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <span>名稱</span>
              </div>
              <TextInput type="text" required={true} value={commodity.name} onChange={e => setCommodity({...commodity, name: e.target.value})}/>
            </div>
            <div>
              <div className="mb-2 block">
                <span>分類</span>
              </div>
              <CategoryInput changeHandler={selectCategory} ref={categoryInputDiv}/>
            </div>
            <div>
              <div className="mb-2 block">
                <span>價格</span>
              </div>
              <TextInput type="text" required={true} value={commodity.price} onChange={e => setCommodity({...commodity, price: e.target.value})} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">{commodity.isCreate ? '建立' : '修改'}</Button>
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
