import { createSlice, nanoid, current } from '@reduxjs/toolkit'
import _ from 'lodash'
import { db } from '../../app/db'

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: [],
  },
  reducers: {
    insertToOrder: (state, action) => {
      state.order.push(action.payload)
    },
    spliceOrder: (state, action) => {
      const index = state.order.findIndex(el => el._id === action.payload )
      state.order.splice(index, 1)
    },
    dumpOrder: (state) => {
      state.order = []
    },
    checkoutOrder: (state) => {
      const order = _.cloneDeep(current(state.order))
      let total = 0
      order.forEach(el => {
        delete el._id
        total += el.price
        total += el.specification.reduce((sum, c) => {
          if (c.price) sum += c.price
          return sum
        }, 0)
      })
      const final = {
        _id: nanoid(),
        contents: order,
        price: total,
        createdAt: new Date()
      }
      db.orders.add(final)
      state.order = []
    }
  },
})

export const getOrder = (state) => state.order.order

export const { insertToOrder, spliceOrder, dumpOrder, checkoutOrder } = orderSlice.actions
export default orderSlice.reducer
