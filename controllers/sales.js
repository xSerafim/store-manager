const {
  getAllSales,
  getSaleById,
  registerSale,
  updateSale,
  deleteSale,
} = require('../services/sales');

const HTTP_OK_STATUS = 200;
const CREATED_STATUS = 201;
const NO_CONTENT = 204;
const SERVER_ERROR = 500;
const NOT_FOUND = 404;

function serverError(res, error) {
  console.log(error);
  return res.status(SERVER_ERROR).json({ message: 'Erro no servidor' });
}

async function allSales(_req, res) {
  try {
    const sales = await getAllSales();
    return res.status(HTTP_OK_STATUS).json(sales);
  } catch (error) {
    return serverError(res, error);
  }
}

async function saleById(req, res) {
  try {
    const { id } = req.params;
    const sale = await getSaleById(id);

    if (!sale[0]) return res.status(NOT_FOUND).json({ message: 'Sale not found' });

    sale.forEach((e) => delete e.saleId);
    return res.status(HTTP_OK_STATUS).json(sale);
  } catch (error) {
    return serverError(res, error);
  }
}

async function registerNewSale(req, res) {
  try {
    const sales = req.body;
    const newSales = await registerSale(sales);
    return res.status(CREATED_STATUS).json(newSales);
  } catch (error) {
    return serverError(res, error);
  }
}

async function updtSale(req, res) {
  try {
    const { id } = req.params;
    const sales = req.body;
    const updatedSale = await updateSale(id, sales);
    if (updatedSale) return res.status(HTTP_OK_STATUS).json(updatedSale);
    return res.status(NOT_FOUND).json({ message: 'Sale not found' });
  } catch (error) {
    return serverError(res, error);
  }
}

async function delSale(req, res) {
  try {
    const { id } = req.params;
    const sale = await deleteSale(id);
    if (sale) return res.status(NO_CONTENT).end();
    return res.status(NOT_FOUND).json({ message: 'Sale not found' }); 
  } catch (error) {
    return serverError(res, error);
  }
}

module.exports = {
  allSales,
  saleById,
  registerNewSale,
  updtSale,
  delSale,
};
