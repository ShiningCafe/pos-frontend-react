import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
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
    }),
    builder.addCase(createCommodityToIndexedDB.fulfilled, (state, action) => {
      state.commodities.push(action.payload)
    }),
    builder.addCase(updateCommodityToIndexedDB.fulfilled, (state, action) => {
      let data = [...current(state.commodities)]
      const idx = data.findIndex(e => e._id === action.payload._id)
      if (idx > -1) {
        data[idx] = action.payload
        state.commodities = data
      }
    }),
    builder.addCase(deleteCommodityToIndexedDB.fulfilled, (state, action) => {
      let data = [...current(state.commodities)]
      const idx = data.findIndex(e => e._id === action.payload)
      if (idx > -1) {
        data.splice(idx, 1)
        state.commodities = data
      }
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
    return await db.commodities.toArray()
  }
)
export const createCommodityToIndexedDB = createAsyncThunk('commodity/post',
  async (data) => {
    data.createdAt = Math.floor(new Date() / 1000);
    data.updatedAt = Math.floor(new Date() / 1000);
    data.uploadedAt = 0;
    await db.commodities.add(data)
    console.log('createCommodityToIndexedDB', data)
    return data
  }
)
export const updateCommodityToIndexedDB = createAsyncThunk('commodity/update',
  async (data) => {
    const storeData = _.cloneDeep(data)
    delete data._id
    data.updatedAt = Math.floor(new Date() / 1000);
    await db.commodities.update(storeData._id, data)
    return storeData
  }
)
export const deleteCommodityToIndexedDB = createAsyncThunk('commodity/delete',
  async (data) => {
    await db.commodities.delete(data._id)
    return data._id
  }
)

// export const getCategory = (state) => state.commodity.category

export const { selectCategory, selectCommodity } = commoditySlice.actions
export default commoditySlice.reducer
