import { configureStore } from '@reduxjs/toolkit'
import commoditySlice from '../features/commodity/commoditySlice'
import orderSlice from '../features/commodity/orderSlice'
import notifySlice from '../layouts/notifySlice'

export default configureStore({
  reducer: {
    commodity: commoditySlice,
    order: orderSlice,
    notify: notifySlice,
  },
})
