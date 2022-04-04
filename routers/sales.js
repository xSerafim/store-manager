const express = require('express');

const {
  allSales,
  saleById,
  registerNewSale,
  updtSale,
} = require('../controllers/sales');

const { validateProduct } = require('../middlewares/salesMiddlewares');

const router = express.Router();

router
  .get('/', allSales)
  .get('/:id', saleById)
  .post('/', validateProduct,
    registerNewSale)
  .put('/:id', validateProduct,
    updtSale);

module.exports = router;
