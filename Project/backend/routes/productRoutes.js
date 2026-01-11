const express = require('express');
const router = express.Router();
const { seedProducts, getProducts } = require('../controllers/AuthController');

// GET /api/products/seed
router.get('/seed', seedProducts);

// GET /api/products/ -> list products
router.get('/', getProducts);

module.exports = router;
