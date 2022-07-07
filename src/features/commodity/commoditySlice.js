import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

const initialState = {
  commodities: [
    {
      _id: '312421',
      name: '多多綠',
      categories: ['熱門商品', '特調', '茶類'],
      price: 50,
      specification: [
        {
          name: '甜度',
          type: 'single',
          value: [
            { name: '正常甜' },
            { name: '半糖' },
            { name: '微糖' },
            { name: '無糖' },
          ],
        },
        {
          name: '冰塊',
          type: 'single',
          value: [
            { name: '正常冰' },
            { name: '少冰' },
            { name: '微冰' },
            { name: '去冰' },
            { name: '溫' },
            { name: '熱', price: 10 },
          ],
        },
        {
          name: '加料',
          type: 'multi',
          value: [
            { name: '珍珠', price: 5 },
            { name: '椰果', price: 5 },
          ],
        },
        {
          name: '測試',
          type: 'multi'
        },
        {
          name: '測試２',
          value: [
            { name: '珍珠', price: 5 },
            { name: '椰果', price: 5 },
          ],
        }
      ],
    },
    {
      _id: '3124212',
      name: '超級無敵紅茶',
      categories: ['熱門商品', '茶類'],
      price: 40,
    },
    {
      _id: '312423',
      name: '高級的金萱青',
      categories: ['茶類'],
      price: 80,
    },
    {
      _id: '312424',
      name: '隱藏版烏龍',
      categories: [],
      price: 90,
    },
  ],
  category: '全部',
  commodity: null,
}

export const commoditySlice = createSlice({
  name: 'commodity',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.category = action.payload
    },
    selectCommodity: (state, action) => {
      state.commodity = action.payload
    },
  },
})

export const getAllCommodities = (state) => state.commodity.commodities
export const getCommoditiesByCategory = (state) => {
  let commodity = state.commodity
  const selected = commodity.category
  let result
  if (selected !== '全部') {
    result = commodity.commodities.filter((item) =>
      item.categories.includes(selected)
    )
  } else {
    result = commodity.commodities
  }
  return result
}
export const getCommodityBySelected = (state) => state.commodity.commodity
export const getCategories = (state) => {
  let list = ['全部']
  state.commodity.commodities.forEach(
    (el) => (list = list.concat(el.categories))
  )
  return _.uniq(list)
}
// export const getCategory = (state) => state.commodity.category

export const { selectCategory, selectCommodity } = commoditySlice.actions
export default commoditySlice.reducer
