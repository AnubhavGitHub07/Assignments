import React from 'react'
import { useCart, useCartDispatch } from '../context/cartHooks'

export default function CartDrawer({ open, onClose }) {
  const items = useCart()
  const dispatch = useCartDispatch()

  const total = items.reduce((s, it) => s + it.price * it.qty, 0)

  if (!open) return null

  return (
    <>
      <div className="cart-backdrop" onClick={onClose} />
      <div className="cart-drawer" role="dialog" aria-modal="true">
        <div className="cart-header">
          <div>
            <h3 style={{ margin: 0 }}>Your cart</h3>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>{items.length} items</div>
          </div>
          <div>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
        <div className="cart-body">
          {items.length === 0 ? (
            <div className="empty">Cart is empty</div>
          ) : (
            items.map((it) => (
              <div className="cart-item" key={it.id}>
                <img src={it.thumbnail} alt={it.title} />
                <div className="ci-info">
                  <div className="ci-title">{it.title}</div>
                  <div className="ci-meta">${Number(it.price).toFixed(2)} × {it.qty}</div>
                </div>
                <div className="ci-actions">
                  <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: it.id })} style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="total">Total: ${total.toFixed(2)}</div>
          <div>
            <button onClick={() => dispatch({ type: 'CLEAR' })} style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}>Clear</button>
          </div>
        </div>
      </div>
    </>
  )
}
