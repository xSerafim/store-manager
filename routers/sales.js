const express = require('express');

const {
  allSales,
  saleById,
} = require('../controllers/sales');

const router = express.Router();

router
  .get('/sales', allSales)
  .get('/sales/:id', saleById);

module.exports = router;
