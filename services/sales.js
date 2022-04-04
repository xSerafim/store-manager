const salesModel = require('../models/salesModel');

async function getAllSales() {
  const result = await salesModel.getAllSales();
  return result;
}

async function getSaleById(id) {
  const result = await salesModel.getSaleById(id);
  return result;
}

async function registerSale(sales) {
  const result = await salesModel.registerSale(sales);
  return result;
}

async function updateSale(id, sales) {
  const saleExists = await getSaleById(id);

  if (!saleExists[0]) return false;

  const result = await salesModel.updateSale(id, sales);
  return result;
}

module.exports = {
  getAllSales,
  getSaleById,
  registerSale,
  updateSale,
};
