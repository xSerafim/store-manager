const productsModel = require('../models/storeManager');

async function getAllProducts() {
  const result = await productsModel.getAllProducts();
  return result;
}

async function getProductById(id) {
  const result = await productsModel.getProductById(id);
  return result;
}

async function createProduct({ name, quantity }) {
  const productAlreadyExists = await productsModel.findProductByName(name);

  if (productAlreadyExists.length === 0) {
    const result = await productsModel.createProduct(name, quantity);
    return result;
  }
  
  return false;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
