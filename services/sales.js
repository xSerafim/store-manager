const salesModel = require('../models/salesModel');
const productsService = require('./products');

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
  const isUpdated = await productsService.updateQuantity(result.itemsSold, 'registerSale');
  if (isUpdated) return false;
  return result;
}

async function updateSale(id, sales) {
  const saleExists = await getSaleById(id);

  if (!saleExists[0]) return false;

  const result = await salesModel.updateSale(id, sales);
  // updateQuantity(result.itemUpdated);

  return result;
}

async function deleteSale(id) {
  const saleExists = await getSaleById(id);

  if (!saleExists[0]) return false;
  productsService.updateQuantity(saleExists, 'deleteSale');
  await salesModel.deleteSale(id);

  return true;
}

module.exports = {
  getAllSales,
  getSaleById,
  registerSale,
  updateSale,
  deleteSale,
};
