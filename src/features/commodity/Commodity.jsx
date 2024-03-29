import React, { useEffect } from 'react'
import CommodityCard from './CommodityCard'
import CommodityCategoryBar from './CommodityCategoryBar'
import CommodityCardModal from './CommodityCardModal'

import { useDispatch, useSelector } from 'react-redux'
import { getCommoditiesByCategory, getCommoditiesFromIndexedDB, selectCategory } from './commoditySlice'

const Commodity = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCommoditiesFromIndexedDB())
    dispatch(selectCategory('全部'))
  }, [])

  const selectedCommodities = useSelector(getCommoditiesByCategory)
  let selectedCommodityDiv
  if (selectedCommodities.length > 0) {
    selectedCommodityDiv = selectedCommodities.map((val) => (
      <CommodityCard key={val._id} item={val} />
    ))
  }

  return (
    <div className="px-4 pt-6 pb-2">
      <CommodityCardModal />
      <CommodityCategoryBar />
      <div className="grid grid-cols-1 gap-4 mt-4 w-full md:grid-cols-4 xl:grid-cols-4">
        {selectedCommodityDiv}
      </div>
    </div>
  )
}

export default Commodity
