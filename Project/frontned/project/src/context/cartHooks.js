import { useContext } from 'react'
import { CartStateContext, CartDispatchContext } from './cartContexts'

export function useCart() {
  const state = useContext(CartStateContext)
  if (state === undefined) {
    throw new Error('useCart must be used within CartProvider')
  }
  return state
}

export function useCartDispatch() {
  const dispatch = useContext(CartDispatchContext)
  if (dispatch === undefined) {
    throw new Error('useCartDispatch must be used within CartProvider')
  }
  return dispatch
}
