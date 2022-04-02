const {
  getAllProducts,
  getProductById,
  createProduct,
} = require('../services/products');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NOT_FOUND_STATUS = 404;
const CONFLICT_STATUS = 409;
const SERVER_ERROR_STATUS = 500;

function serverError(res, error) {
  console.log(error);
  return res.status(SERVER_ERROR_STATUS).json({ message: 'Erro no servidor' });
}

async function allProducts(_req, res) {
  try {
    const products = await getAllProducts();
      return res.status(OK_STATUS).json(products);
  } catch (error) {
    return serverError(res, error);
  }
}

async function productById(req, res) {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product[0]) return res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });
  
    return res.status(OK_STATUS).json(...product);
  } catch (error) {
    return serverError(res, error);
  }
}

async function newProduct(req, res) {
  try {
    const product = req.body;
    const createdProduct = await createProduct(product);
    if (createdProduct) {
      return res.status(CREATED_STATUS).json(createdProduct);
    }
    return res.status(CONFLICT_STATUS).json({ message: 'Product already exists' });
  } catch (error) {
    return serverError(res, error);
  }
}

module.exports = {
  allProducts,
  productById,
  newProduct,
};
