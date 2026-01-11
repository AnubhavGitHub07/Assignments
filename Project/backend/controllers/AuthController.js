const Product = require('../models/productModel');
const sampleProducts = require('../data/products');

// Seed the products collection
const seedProducts = async (req, res) => {
  try {
    // If ?source=remote is provided, fetch dummyjson. Otherwise use local sampleProducts.
    const useRemote = req.query.source === 'remote';
    let toInsert = sampleProducts;
    if (useRemote) {
      const remoteRes = await fetch('https://dummyjson.com/products?limit=100');
      if (!remoteRes.ok) throw new Error(`Remote fetch failed ${remoteRes.status}`);
      const remoteJson = await remoteRes.json();
      toInsert = remoteJson.products.map((p) => ({
        externalId: p.id,
        title: p.title,
        description: p.description,
        price: p.price,
        discountPercentage: p.discountPercentage,
        rating: p.rating,
        stock: p.stock,
        brand: p.brand,
        category: p.category,
        thumbnail: p.thumbnail,
        images: p.images || [],
      }));
    }

    // remove all existing products
    await Product.deleteMany({});

    // insert seed data
    const created = await Product.insertMany(toInsert);
    res.status(201).json({ createdCount: created.length, products: created });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Seeding failed', error: error.message });
  }
};

// Get products from DB and return in frontend-friendly shape
const getProducts = async (req, res) => {
  try {
    const docs = await Product.find({}).lean();
    const products = docs.map((d) => ({
      id: d.externalId || d._id,
      title: d.title || d.name,
      description: d.description,
      price: d.price,
      discountPercentage: d.discountPercentage || 0,
      rating: d.rating || 0,
      stock: d.stock || d.countInStock || 0,
      brand: d.brand || '',
      category: d.category || '',
      thumbnail: d.thumbnail || d.image || '',
      images: d.images || [],
    }));
    res.json({ products });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Failed to get products', error: error.message });
  }
};



Server.put("/register", async( req , res)=>{
const { email , password } = req.body;
try{
  const user = await User.create({ email , password });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.status(201).json({ message: 'User created successfully', user });
} catch (error) {
  res.status(500).json({ message: 'Failed to create user', error: error.message });
}
})

module.exports = { seedProducts, getProducts };
