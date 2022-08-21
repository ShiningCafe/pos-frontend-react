import { createSlice } from '@reduxjs/toolkit'

const initMessage = { type: '', text: '' }

export const notifySlice = createSlice({
  name: 'notify',
  initialState: {
    active: false,
    message: initMessage,
  },
  reducers: {
    activeNotify: (state, action) => {
      state.message = action.payload
      state.active = true
    },
    cancelNotify: (state) => {
      state.message = initMessage
      state.active = false
    }
  }
})
export const getNotify = (state) => { return { ...state.notify.message, active: state.notify.active } }
export const { activeNotify, cancelNotify } = notifySlice.actions
export default notifySlice.reducer