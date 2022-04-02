const express = require('express');

const {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  delProduct,
} = require('../controllers/products');

const { validateProduct } = require('../middlewares/productsMiddlewares');

const router = express.Router();

router
  .get('/', getAllProducts)
  .get('/:id', getProductById)
  .post('/',
    validateProduct,
    postProduct)
  .put('/:id',
    validateProduct,
    putProduct)
  .delete('/:id', delProduct);

module.exports = router;
