import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import _ from 'lodash'
import { db } from '../../app/db'

const initialState = {
  commodities: [],
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
  extraReducers(builder) {
    builder.addCase(getCommoditiesFromIndexedDB.fulfilled, (state, action) => {
      state.commodities = action.payload
    })
  }
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
  const commodities = _.cloneDeep(state.commodity.commodities)
  commodities.forEach(
    (el) => (list = list.concat(el.categories))
  )
  return _.uniq(list)
}
export const getCommoditiesFromIndexedDB = createAsyncThunk('commoditiy/get',
  async () => {
    return await db.commoditys.toArray()
  }
)
// export const getCategory = (state) => state.commodity.category

export const { selectCategory, selectCommodity } = commoditySlice.actions
export default commoditySlice.reducer
