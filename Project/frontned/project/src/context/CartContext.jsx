import React, { useReducer, useEffect } from 'react'
import { CartStateContext, CartDispatchContext } from './cartContexts'

const CART_KEY = 'app_cart_v1'

function cartReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload || []

    case 'ADD_ITEM': {
      const item = action.payload
      const exists = state.find(i => i.id === item.id)
      if (exists) {
        return state.map(i =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...state, { ...item, qty: 1 }]
    }

    case 'REMOVE_ITEM':
      return state.filter(i => i.id !== action.payload)

    case 'SET_QTY':
      return state.map(i =>
        i.id === action.payload.id
          ? { ...i, qty: action.payload.qty }
          : i
      )

    case 'CLEAR':
      return []

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY)
      if (raw) dispatch({ type: 'HYDRATE', payload: JSON.parse(raw) })
    } catch (err) {
      console.error('Cart hydration failed:', err)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(state))
    } catch (err) {
      console.error('Cart persistence failed:', err)
    }
  }, [state])

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

// Note: hooks that consume the contexts are provided in a separate file
// to keep this file focused on the Provider component and avoid Fast Refresh warnings.
