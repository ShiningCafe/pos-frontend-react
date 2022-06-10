import { configureStore } from '@reduxjs/toolkit'
import testReducer from './testReducer'

export default configureStore({
  reducer: {
    test: testReducer
  }
})