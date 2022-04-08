const services = require('../services/products');
const errorHandler = require('../utils/serverError');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NO_CONTENT = 204;
const NOT_FOUND_STATUS = 404;
const CONFLICT_STATUS = 409;

async function getAllProducts(_req, res) {
  try {
    const products = await services.allProducts();
    return res.status(OK_STATUS).json(products);
  } catch (error) {
    return errorHandler.serverError(res, error);
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await services.productById(id);
    if (!product[0]) return res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });
  
    return res.status(OK_STATUS).json(...product);
  } catch (error) {
    return errorHandler.serverError(res, error);
  }
}

async function postProduct(req, res) {
  try {
    const product = req.body;
    const createdProduct = await services.createProduct(product);
    if (createdProduct) {
      return res.status(CREATED_STATUS).json(createdProduct);
    }
    return res.status(CONFLICT_STATUS).json({ message: 'Product already exists' });
  } catch (error) {
    return errorHandler.serverError(res, error);
  }
}

async function putProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await services.updateProduct(id, name, quantity);

    if (product) return res.status(OK_STATUS).json(product);
    return res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });
  } catch (error) {
    return errorHandler.serverError(res, error);
  }
}

async function delProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await services.deleteProduct(id);

    if (product) return res.status(NO_CONTENT).end();
    return res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });
  } catch (error) {
    return errorHandler.serverError(res, error);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  delProduct,
};
