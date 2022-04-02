const express = require('express');

const {
  allSales,
  saleById,
} = require('../controllers/sales');

const router = express.Router();

router
  .get('/', allSales)
  .get('/:id', saleById);

module.exports = router;
