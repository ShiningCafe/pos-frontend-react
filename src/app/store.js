import { configureStore } from '@reduxjs/toolkit'
import commoditySlice from '../features/commodity/commoditySlice'
import orderSlice from '../features/commodity/orderSlice'

export default configureStore({
  reducer: {
    commodity: commoditySlice,
    order: orderSlice,
  },
})
