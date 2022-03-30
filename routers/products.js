const express = require('express');

const router = express.Router();

router
  .get('/products')
  .get('/products/:id');

module.exports = router;
