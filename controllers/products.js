const {
  getAllProducts,
  getProductById,
} = require('../services/products');

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

async function allProducts(_req, res) {
  try {
    const products = await getAllProducts();
      return res.status(HTTP_OK_STATUS).json(products);
  } catch (error) {
    console.log(error);
    return res.status(SERVER_ERROR).json({ message: 'Erro no servidor' });
  }
}

async function productById(req, res) {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product[0]) return res.status(NOT_FOUND).json({ message: 'Product not found' });
  
    return res.status(HTTP_OK_STATUS).json(product);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  allProducts,
  productById,
};
