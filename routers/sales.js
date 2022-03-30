const express = require('express');

const router = express.Router();

router
  .get('/sales')
  .get('/sales/:id');

module.exports = router;
