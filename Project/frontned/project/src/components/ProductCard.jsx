import './productCard.css'
import { useCartDispatch, useCart } from '../context/cartHooks'

function Price({ value }) {
  return <div className="price">${Number(value).toFixed(2)}</div>
}

function Stars({ value }) {
  const v = Math.round(value * 2) / 2
  return <div className="rating">{'⭐'.repeat(Math.floor(v))}{v % 1 ? '½' : ''} {value}</div>
}

export default function ProductCard({ product }) {
  const { title, description, price, rating, thumbnail, images = [], id } = product
  const image = thumbnail || images[0] || ''
  const dispatch = useCartDispatch()
  const cart = useCart()

  const inCart = cart.find((i) => String(i.id) === String(id))

  function addToCart() {
    dispatch({
      type: 'ADD_ITEM',
      payload: { id, title, price, thumbnail: image },
    })
  }

  return (
    <article className="product-card">
      <div className="media">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="placeholder">No image</div>
        )}
      </div>
      <div className="body">
        <h3 className="title">{title}</h3>
        <p className="desc">{description}</p>
        <div className="meta">
          <Price value={price} />
          <Stars value={rating} />
        </div>
        <div style={{ marginTop: 8 }}>
          <button className="add-btn" onClick={addToCart}>{inCart ? 'Add again' : 'Add to cart'}</button>
        </div>
      </div>
    </article>
  )
}
