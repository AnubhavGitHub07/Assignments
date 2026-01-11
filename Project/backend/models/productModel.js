const mongoose = require('mongoose');

// Product schema aligned with https://dummyjson.com/products
const productSchema = new mongoose.Schema(
  {
    // original dummyjson id (numeric)
    externalId: { type: Number, index: true, unique: false, sparse: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    brand: { type: String, default: '' },
    category: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
