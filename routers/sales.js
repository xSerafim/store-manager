const express = require('express');

const {
  allSales,
  saleById,
  registerNewSale,
} = require('../controllers/sales');

const router = express.Router();

router
  .get('/', allSales)
  .get('/:id', saleById)
  .post('/', registerNewSale);

module.exports = router;
