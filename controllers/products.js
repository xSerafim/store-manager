const {
  allProducts,
  productById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../services/products');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NO_CONTENT = 204;
const NOT_FOUND_STATUS = 404;
const CONFLICT_STATUS = 409;
const SERVER_ERROR_STATUS = 500;

function serverError(res, error) {
  console.log(error);
  return res.status(SERVER_ERROR_STATUS).json({ message: 'Erro no servidor' });
}

async function getAllProducts(_req, res) {
  try {
    const products = await allProducts();
      return res.status(OK_STATUS).json(products);
  } catch (error) {
    return serverError(res, error);
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await productById(id);
    if (!product[0]) return res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });
  
    return res.status(OK_STATUS).json(...product);
  } catch (error) {
    return serverError(res, error);
  }
}

async function postProduct(req, res) {
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

async function putProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await updateProduct(id, name, quantity);

    if (product) return res.status(OK_STATUS).json(product);
    return res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });
  } catch (error) {
    return serverError(res, error);
  }
}

async function delProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await deleteProduct(id);

    if (product) return res.status(NO_CONTENT).end();
    return res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });
  } catch (error) {
    return serverError(res, error);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  delProduct,
};
