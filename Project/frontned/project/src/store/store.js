import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productSlice'
import cartReducer from './cartSlice'
import { loadCart, saveCart } from './localStorage'

const preloaded = {
  cart: loadCart(),
}

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  preloadedState: preloaded,
})

// persist cart on changes
let prevCartJson = null
store.subscribe(() => {
  try {
    const cart = store.getState().cart
    const serialized = JSON.stringify(cart)
    if (serialized !== prevCartJson) {
      prevCartJson = serialized
      saveCart(cart)
    }
  } catch {
    // ignore
  }
})

export default store
