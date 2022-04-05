const productsModel = require('../models/productsModel');

async function allProducts() {
  const result = await productsModel.allProducts();
  return result;
}

async function productById(id) {
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

async function updateProduct(id, name, quantity) {
  const searchId = await productsModel.getProductById(id);

  if (!searchId[0]) return false;

  const updatedProduct = await productsModel.updateProduct(id, name, quantity);
  return updatedProduct;
}

async function deleteProduct(id) {
  const searchId = await productsModel.getProductById(id);

  if (!searchId[0]) return false;

  await productsModel.deleteProduct(id);
  return true;
}

async function updateQuantity(sales, operation) {
  const productsById = sales.map((sale) => productById(sale.productId));
  const resolvedPromise = await Promise.all(productsById);

  if (operation === 'deleteSale') {
    const sumQuantity = sales.map((sale, index) => (
      { id: sale.productId,
        quantity: resolvedPromise.flat()[index].quantity + sale.quantity,
      }));
    productsModel.updateQuantity(sumQuantity);
  }
  if (operation === 'registerSale') {
    const subQuantity = sales.map((sale, index) => (
      { id: sale.productId,
        quantity: resolvedPromise.flat()[index].quantity - sale.quantity,
      }));
    productsModel.updateQuantity(subQuantity);
  }
}

module.exports = {
  allProducts,
  productById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateQuantity,
};
