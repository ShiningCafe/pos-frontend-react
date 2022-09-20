import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getCategories, selectCategory } from "./commoditySlice";
import { Select } from 'flowbite-react'

const CommodityCategoryBar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const [selected, setSelected] = useState("全部");

  function selectCategoryEvent(val) {
    dispatch(selectCategory(val));
    setSelected(val);
  }
  const screenWidth = screen.width;
  const categoryButtons = categories.map((title, idx) => {
    if (selected !== title) {
      return (
        <button
          key={idx}
          type="button"
          onClick={() => selectCategoryEvent(title)}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative w-full py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md">
            {title}
          </span>
        </button>
      );
    } else {
      return (
        <button
          key={idx}
          type="button"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="py-2.5">{title}</span>
        </button>
      );
    }
  });

  return (
    <React.Fragment>
      {screenWidth < 640 ? (
        <Select onChange={event => { selectCategoryEvent(event.target.value) }}>
          {categories.map((title, idx) => {
            return (<option key={`option_${idx}`} value={title} >{title}</option>)
          })}
        </Select>
      ) : (
        <div className="grid grid-cols-2 gap-2 mt-4 w-full md:grid-cols-6 xl:grid-cols-8">
          {categoryButtons}
        </div>
      )}
    </React.Fragment>
  );
};

export default CommodityCategoryBar;
