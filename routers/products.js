const express = require('express');
const { allProducts, productById } = require('../controllers/products');

const router = express.Router();

router
  .get('/products', allProducts)
  .get('/products/:id', productById);

module.exports = router;
