import { createSlice, nanoid, current } from '@reduxjs/toolkit'
import _ from 'lodash'
import dayjs from 'dayjs'
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
      state.order = []
      // 從資料庫撈出今天的訂單好計算單號
      const today = dayjs().format('YYYY/MM/DD')
      // db.orders.where('createdAt').between(new Date(`${today} 00:00:00`), new Date(`${today} 23:59:59`)).count().then(count => {
        db.orders.where('createdAt').between(new Date(`${today} 00:00:00`), new Date(`${today} 23:59:59`)).last().then(res => {
        let serialNumber = 1
        if (res) serialNumber = res.serial + 1
        
        // 計算總金額
        let total = 0
        order.forEach(el => {
          delete el._id
          total += el.price
          total += el.specification.reduce((sum, c) => {
            if (c.price) sum += c.price
            return sum
          }, 0)
        })
        // 最後要寫入的資料
        const final = {
          _id: nanoid(),
          serial: serialNumber,
          contents: order,
          price: total,
          createdAt: Math.floor(new Date() / 1000),
          voidedAt: null,
          updatedAt: Math.floor(new Date() / 1000),
          uploadedAt: 0,
        }
        db.orders.add(final)
      })
    },
    voidOrder: (state, action) => {
      const id = action.payload._id
      if (!id) throw new Error('no matched Id');
      const unixtime = Math.floor(new Date()/1000);
      db.orders.update(id, { voidedAt: unixtime, updatedAt: unixtime });
    }
  },
})

export const getOrder = (state) => state.order.order

export const { insertToOrder, spliceOrder, dumpOrder, checkoutOrder, voidOrder } = orderSlice.actions
export default orderSlice.reducer
