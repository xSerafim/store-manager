const express = require('express');
const { allProducts, productById, newProduct } = require('../controllers/products');
const { validateProduct } = require('../middlewares/productsMiddlewares');

const router = express.Router();

router
  .get('/', allProducts)
  .get('/:id', productById)
  .post('/',
    validateProduct,
    newProduct);

module.exports = router;
