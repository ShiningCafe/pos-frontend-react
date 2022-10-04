import React from "react";
import { useEffect, Fragment, useState, useRef } from "react";
import { useParams,useNavigate } from "react-router-dom";
// dexie db
import { db } from "../../../app/db";
import { useLiveQuery } from "dexie-react-hooks";
// redux
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import {
  createCommodityToIndexedDB,
  updateCommodityToIndexedDB,
  deleteCommodityToIndexedDB,
} from "../../commodity/commoditySlice";
import { activeNotify } from "../../../layouts/notifySlice";
// UI element
import { TextInput, Button, ToggleSwitch, ListGroup } from "flowbite-react";
import { HiPlus, HiChevronUp, HiChevronDown } from 'react-icons/hi'
import Card from "../../../components/ui/Card";
import ToggleButton from "../../../components/ui/ToggleButton";
import CategoryInput from "./CategoryInput";
import SpecCommonSaveModal from "./SpecCommonSaveModal";
import NewButton from "../../../components/ui/Button";

const SettingCommodityFullpage = () => {
  const { id } = useParams();
  const categoryInputDiv = useRef();
  const specCommonSaveModal = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initCommodity = {
    name: "",
    price: "",
    categories: [],
    specification: [],
  };
  const [commodity, setCommodity] = useState(initCommodity);
  const [selectedSpec, setSelectedSpec] = useState({ name: ''});
  const [selectedIndex, setSelectedIndex] = useState();

  const [selectedValue, setSelectedValue] = useState({ name: '', price: '' });
  const [selectedValueIndex, setSelectedValueIndex] = useState();


  useLiveQuery(async () => {
    const data = await db.commodities.get(id);
    if (data) {
      console.log("data", data);
      setCommodity(data);
      categoryInputDiv.current.init(data.categories);
    }
  });

  function selectSpecEvent (data, idx) {
    setSelectedSpec(data)
    setSelectedIndex(idx)
    //
    setSelectedValue({ name: '', price: '' })
    setSelectedValueIndex(-1)
  }

  function updateSpecValue () {
    const newValue = selectedSpec.value
    newValue[selectedValueIndex] = selectedValue
    newValue[selectedValueIndex].price = parseInt(newValue[selectedValueIndex].price)
    setSelectedSpec({ ...selectedSpec, value: newValue })
  }

  function InsertSpecValue () {
    // 增加項目
    let newValue = selectedSpec.value
    if (!newValue) newValue = []
    newValue.push({ name: '未命名項目' })
    setSelectedSpec({ ...selectedSpec, value: newValue })
  }

  function DeleteSpecValue () {
    const idx = selectedValueIndex
    if (idx <= -1) return false
    const newValue = selectedSpec.value
    newValue.splice(idx, 1)
    setSelectedSpec({ ...selectedSpec, value: newValue })
  }

  function updateSpec () {
    const newSpec = commodity.specification
    newSpec[selectedIndex] = selectedSpec
    setCommodity({ ...commodity, specification: newSpec })
  }

  function InsertSpec () {
    let newSpec = commodity.specification
    if (!newSpec) newSpec = []
    newSpec.push({ name: '未命名規格', type: 'single', value: [] })
    setCommodity({ ...commodity, specification: newSpec })
  }

  function DeleteSpec () {
    const idx = selectedIndex
    if (idx <= -1) return false
    const newSpec = commodity.specification
    newSpec.splice(idx, 1)
    setCommodity({ ...commodity, specification: newSpec })
  }

  function CloneSpec () {
    let newSpec = commodity.specification
    let targer = newSpec[selectedIndex]
    newSpec.push(targer)
    setCommodity({ ...commodity, specification: newSpec })
  }

  function submitCommodity () {
    const data = {...commodity}
    data.price = parseInt(data.price)
    dispatch(updateCommodityToIndexedDB(data))
    dispatch(activeNotify({ type: 'success', message: '資料已儲存'}))
  }

  function deleteCommodity () {
    dispatch(deleteCommodityToIndexedDB(commodity)).then(() => {
      navigate('/setting/commodity')
      dispatch(activeNotify({ type: 'success', message: '商品已刪除'}))
    })
  }

  function cloneCommodity () {
    // 複製成新的商品
    let data = { ...commodity };
    data._id = nanoid();
    data.name = data.name + '- 複製'
    data.price = parseInt(data.price)
    dispatch(createCommodityToIndexedDB(data)).then(() => {
      navigate(`/setting/commodity/${data._id}`)
      setCommodity(data)
      dispatch(activeNotify({ type: 'success', message: '商品複製成功'}))
    });
  }

  function specOrderRise () {
    const idx = selectedIndex
    if (idx <= 0) return false
    const data = commodity.specification
    const temp = data[idx]
    data.splice(idx, 1)
    data.splice(idx - 1, 0, temp)
    setCommodity({ ...commodity, specification: data })
    setSelectedIndex(idx - 1)
  }

  function specOrderDown () {
    const idx = selectedIndex
    const data = commodity.specification
    if (idx >= data.length) return false
    const temp = data[idx]
    data.splice(idx, 1)
    data.splice(idx + 1, 0, temp)
    setCommodity({ ...commodity, specification: data })
    setSelectedIndex(idx + 1)
  }

  useEffect(() => {
    if (selectedValueIndex > -1) updateSpecValue()
  }, [selectedValue])

  useEffect(() => {
    if (selectedIndex > -1) updateSpec()
  }, [selectedSpec])

  return (
    <React.Fragment>
      <SpecCommonSaveModal ref={specCommonSaveModal} select={spec => setCommodity({ ...commodity, specification: spec })}/>
    
    <div className="px-4 pt-6 pb-2">
      <div className="w-full text-right">
        <div className="inline-flex gap-2">
          <NewButton onClick={deleteCommodity} className="bg-red-200 text-red-600 hover:bg-red-100">刪除商品</NewButton>
          <NewButton onClick={cloneCommodity} className="bg-blue-200 text-blue-600 hover:bg-blue-100">複製成新商品</NewButton>
          <NewButton onClick={submitCommodity}>儲存商品</NewButton>
          <NewButton onClick={() => navigate('/setting/commodity')} color="light">返回列表</NewButton>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        {/* 商品基本資料 */}
        <Card>
          <div className="border-b-2">
            <p>商品資料</p>
          </div>
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
        </Card>
        {/* 分類 */}
        <Card>
          <div className="border-b-2 mb-2">
            <p>商品分類</p>
          </div>
          <div>
            <CategoryInput
              changeHandler={(e) =>
                setCommodity({ ...commodity, categories: e })
              }
              ref={categoryInputDiv}
              edit
            />
          </div>
        </Card>
      </div>
      {/* 規格 */}
      <div className="mt-2">
        <Card>
          <div className="border-b-2">
            <p>商品規格</p>
          </div>
          <div className="inline-flex gap-1 my-4">
            <Button size="xs" onClick={() => InsertSpec()}>新增</Button>
            <Button size="xs" onClick={() => {specCommonSaveModal.current.open(commodity.specification)}}>常用組合</Button>

            {selectedIndex > -1 ? (
              <Fragment>
                <Button size="xs" color="dark" onClick={specOrderRise}><HiChevronUp className="w-4 h-4"/></Button>
                <Button size="xs" color="dark" onClick={specOrderDown}><HiChevronDown className="w-4 h-4"/></Button>
                <Button size="xs" color="dark" onClick={CloneSpec}>複製</Button>
                <Button size="xs" color="dark" onClick={DeleteSpec}>刪除</Button>
              </Fragment>
            ): ''}
            
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <ListGroup>
                {commodity?.specification
                  ? commodity.specification.map((el, idx) => {
                      return (
                        <ListGroup.Item
                          key={`spec_item_${el.name}_${idx}`}
                          active={selectedIndex === idx}
                          onClick={() => {
                            selectSpecEvent(el, idx);
                          }}
                        >
                          {el.name}
                        </ListGroup.Item>
                      );
                    })
                  : ""}
              </ListGroup>
            </div>

            <div className="md:col-span-2">
              <div>
                <div className="mb-2 block">
                  <span>規格名稱</span>
                </div>
                <TextInput
                  type="text"
                  value={selectedSpec.name}
                  onChange={e => setSelectedSpec({ ...selectedSpec, name: e.target.value })}
                />
              </div>
              <div className="inline-flex gap-4 mt-2">
                <ToggleSwitch
                  label="可複選"
                  checked={selectedSpec.type === 'multi'}
                  onChange={e => setSelectedSpec({ ...selectedSpec, type: e ? 'multi' : 'single' })}
                />
                <ToggleSwitch
                  label="必選"
                  checked={selectedSpec.required}
                  onChange={e => setSelectedSpec({ ...selectedSpec, required: e})}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <span>規格項目</span>
                </div>
                <div className="inline-flex flex-wrap">
                  { selectedSpec?.value ? selectedSpec.value.map((el, idx) => {
                    return (<ToggleButton key={`toggle_button_${el.name}_${idx}`} onClick={() => { setSelectedValue(el); setSelectedValueIndex(idx) } } active={idx === selectedValueIndex}>{el.name}{el.price ? ` +$${el.price}` : ''}</ToggleButton>)
                  }) : ''}
                  <Button color="dark" className="mb-2" onClick={() => InsertSpecValue()}>新增<HiPlus/></Button>
                </div>
                { selectedValueIndex > -1 ? (
                 <div>
                  <div>
                    <div className="mb-2 block">
                      <span>項目名稱</span>
                    </div>
                    <TextInput
                      type="text"
                      value={selectedValue.name}
                      onChange={e => setSelectedValue({ ...selectedValue, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <span>項目加價</span>
                    </div>
                    <TextInput
                      type="number"
                      value={selectedValue?.price ? selectedValue.price : '' }
                      onChange={e => setSelectedValue({ ...selectedValue, price: e.target.value})}
                    />
                  </div>
                  <Button className="mt-3" color="light" onClick={() => DeleteSpecValue()}>刪除項目</Button>
                </div>
                ): ''}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
    </React.Fragment>
  );
};

export default SettingCommodityFullpage;
