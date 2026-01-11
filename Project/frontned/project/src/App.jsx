import './App.css'
import ProductList from './components/ProductList'
import NavBar from './components/NavBar'
import CartDrawer from './components/CartDrawer'
import { CartProvider } from './context/CartContext'
import { useCart } from './context/cartHooks'
import { useState } from 'react'

function AppInner() {
  const [search, setSearch] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const cart = useCart()

  return (
    <div>
      <NavBar search={search} setSearch={setSearch} cartCount={cart.reduce((s, i) => s + i.qty, 0)} onToggleCart={() => setCartOpen((s) => !s)} />

      <main>
        <ProductList search={search} />
      </main>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  )
}



