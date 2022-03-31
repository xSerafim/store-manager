const productsModel = require('../models/storeManager');

async function getAllProducts() {
  const result = await productsModel.getAllProducts();
  return result;
}

async function getProductById(id) {
  const result = await productsModel.getProductById(id);
  return result;
}

module.exports = {
  getAllProducts,
  getProductById,
};