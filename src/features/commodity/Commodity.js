import React from 'react'
import CommodityCard from './CommodityCard'
import CommodityCategoryBar from './CommodityCategoryBar'
import CommodityCardModal from './CommodityCardModal'

import { useSelector } from 'react-redux'
import { getCommoditiesByCategory } from './commoditySlice'

const Commodity = () => {

  const selectedCommodities = useSelector(getCommoditiesByCategory)
  const selectedCommodityDiv = selectedCommodities.map((val) => (
    <CommodityCard key={val._id} item={val} />
  ))

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
