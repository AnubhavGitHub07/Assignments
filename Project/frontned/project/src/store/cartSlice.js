import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload
      const exists = state.items.find((i) => String(i.id) === String(item.id))
      if (exists) {
        state.items = state.items.map((i) =>
          String(i.id) === String(item.id) ? { ...i, qty: i.qty + 1 } : i
        )
      } else {
        state.items.push({ ...item, qty: 1 })
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((i) => String(i.id) !== String(action.payload))
    },
    setQty(state, action) {
      const { id, qty } = action.payload
      state.items = state.items.map((i) => (String(i.id) === String(id) ? { ...i, qty } : i))
    },
    clear(state) {
      state.items = []
    },
  },
})

export const { addItem, removeItem, setQty, clear } = cartSlice.actions
export default cartSlice.reducer
