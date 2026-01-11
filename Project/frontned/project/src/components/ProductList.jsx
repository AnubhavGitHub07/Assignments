import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

export default function ProductList({ search = '' }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchProducts() {
      setLoading(true)
      setError(null)
      try {
        // fetch directly from dummyjson API
        const res = await fetch('https://dummyjson.com/products?limit=24')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        // dummyjson returns { products: [...] }
        if (!cancelled) setProducts(json.products || [])
      } catch (err) {
        if (!cancelled) setError(err.message || 'Fetch failed')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchProducts()
    return () => { cancelled = true }
  }, [])

  if (loading)
    return (
      <div className="loader">
        <div style={{ marginBottom: 12 }}>Loading products…</div>
        <div className="skeleton-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-media" />
              <div className="skeleton-line mid" />
              <div className="skeleton-line short" />
              <div style={{ flex: 1 }} />
              <div className="skeleton-line" style={{ width: '50%' }} />
            </div>
          ))}
        </div>
      </div>
    )
  if (error) return <div className="error">Error: {error}</div>

  const filtered = search.trim()
    ? products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || (p.description || '').toLowerCase().includes(search.toLowerCase()))
    : products

  return (
    <section>
      <div className="products-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
