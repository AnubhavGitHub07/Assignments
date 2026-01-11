// Simple helpers to persist cart slice to localStorage
const CART_KEY = 'redux_cart_v1'

export function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return undefined
    return { items: JSON.parse(raw) }
  } catch {
    // ignore and don't preload
    return undefined
  }
}

export function saveCart(cartState) {
  try {
    if (!cartState) return
    // store just the items array
    localStorage.setItem(CART_KEY, JSON.stringify(cartState.items || []))
  } catch {
    // ignore
  }
}
