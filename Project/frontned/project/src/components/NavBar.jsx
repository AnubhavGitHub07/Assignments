import React from 'react'

export default function NavBar({ search, setSearch, cartCount, onToggleCart }) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="brand">Product Store</div>
          <div style={{ color: 'var(--muted)', fontSize: 13 }}>Quality products</div>
        </div>

        <div className="search">
          <input
            aria-label="Search products"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="actions">
          <button className="cart-btn" onClick={onToggleCart} aria-label="Open cart">
            <span style={{ fontSize: 16 }}>🛒</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
