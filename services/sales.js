const salesModel = require('../models/storeManager');

async function getAllSales() {
  const result = await salesModel.getAllSales();
  return result;
}

async function getSaleById(id) {
  const result = await salesModel.getSaleById(id);
  return result;
}

module.exports = {
  getAllSales,
  getSaleById,
};
