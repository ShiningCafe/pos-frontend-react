import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { getCategories, selectCategory } from './commoditySlice'

const CommodityCategoryBar = () => {
  const dispatch = useDispatch()
  const categories = useSelector(getCategories)
  const [selected, setSelected] = useState('全部')

  function selectCategoryEvent(val) {
    dispatch(selectCategory(val))
    setSelected(val)
  }

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
      )
    } else {
      return (
        <button
          key={idx}
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
        >
          {title}
        </button>
      )
    }
  })

  return (
    <div className="grid grid-cols-2 gap-2 mt-4 w-full md:grid-cols-6 xl:grid-cols-8">
      {categoryButtons}
    </div>
  )
}

export default CommodityCategoryBar
