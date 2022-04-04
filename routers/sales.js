const express = require('express');

const {
  allSales,
  saleById,
  registerNewSale,
  updtSale,
  delSale,
} = require('../controllers/sales');

const { validateProduct } = require('../middlewares/salesMiddlewares');

const router = express.Router();

router
  .get('/', allSales)
  .get('/:id', saleById)
  .post('/', validateProduct,
    registerNewSale)
  .put('/:id', validateProduct,
    updtSale)
  .delete('/:id', delSale);

module.exports = router;
