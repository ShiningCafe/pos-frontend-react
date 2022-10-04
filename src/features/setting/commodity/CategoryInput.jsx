import React, { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import propTypes from "prop-types";
import { Checkbox, TextInput } from "flowbite-react";
//
import { useSelector } from "react-redux";
import { getCategories } from "../../commodity/commoditySlice";

const CategoryInput = forwardRef((props, ref) => {

  const oriCategories = useSelector(getCategories);
  const [categories, setCategories] = useState(oriCategories)
  if (categories.includes("全部")) {
    const c = [...categories]
    const idx = c.findIndex((el) => el === "全部");
    c.splice(idx, 1);
    setCategories(c)
  }

  // 處理選擇checkbox
  const [selected, setSelected] = useState([]);
  function handleSelect (e) {
    const value = e.target.value;
    if (selected.includes(value)) {
      const newSelected = [...selected]
      newSelected.splice(newSelected.findIndex(e => e === value), 1)
      setSelected(newSelected)
    } else {
      setSelected(state => [...state, value]);
    }
  }

  // 處理新增選項
  function insertCategory (e) {
    if (e.key != 'Enter') return
    const value = e.target.value;
    if (categories.includes(value)) return
    setCategories(state => [...state, value])
    setSelected(state => [...state, value])
    e.target.value = ''
  }

  // 有改變就回傳至父元件
  useEffect(() => {
    props.changeHandler(selected)
  }, [selected])

  // 從父元件丟過來的
  useImperativeHandle(ref, () => ({
    init (data) {
      if (data) {
        setSelected(data)
      } else {
        setSelected([])
      }
      setCategories(oriCategories)
    }
  }))

  return (
    <div>
      <div className="inline-flex flex-wrap gap-3 mb-4">
        {categories.map((item) => {
          return (
            <div className="flex" key={`checkbox_${item}`}>
              <Checkbox
                id={`checkbox_${item}`}
                className="self-center"
                onChange={handleSelect}
                value={item}
                checked={selected.includes(item)}
              />
              <label htmlFor={`checkbox_${item}`} className="ml-1">
                {item}
              </label>
            </div>
          );
        })}
      </div>
      {
        props.edit ? (<TextInput onKeyDown={insertCategory} placeholder="要新增類別的話，在此輸入"/>) : ''
      }
      
    </div>

  );
});

CategoryInput.propTypes = {
  changeHandler: propTypes.func,
  edit: propTypes.bool
};
CategoryInput.displayName = 'CategoryInput'
export default CategoryInput;
