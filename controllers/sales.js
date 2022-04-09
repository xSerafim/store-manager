const services = require('../services/sales');
const errorHandler = require('../utils/serverError');

const HTTP_OK_STATUS = 200;
const CREATED_STATUS = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;

async function allSales(_req, res) {
  try {
    const sales = await services.getAllSales();
    return res.status(HTTP_OK_STATUS).json(sales);
  } catch (error) {
    return errorHandler.serverError(res, error);
  }
}

async function saleById(req, res) {
  try {
    const { id } = req.params;
    const sale = await services.getSaleById(id);

    if (!sale[0]) return res.status(NOT_FOUND).json({ message: 'Sale not found' });

    sale.forEach((e) => delete e.saleId);
    return res.status(HTTP_OK_STATUS).json(sale);
  } catch (error) {
    return errorHandler.serverError(res, error);
  }
}

async function registerNewSale(req, res) {
  try {
    const sales = req.body;
    const newSales = await services.registerSale(sales);
    return res.status(CREATED_STATUS).json(newSales);
  } catch (error) {
    return errorHandler.serverError(res, error);
  }
}

async function updtSale(req, res) {
  try {
    const { id } = req.params;
    const sales = req.body;
    const updatedSale = await services.updateSale(id, sales);
    if (updatedSale) return res.status(HTTP_OK_STATUS).json(updatedSale);
    return res.status(NOT_FOUND).json({ message: 'Sale not found' });
  } catch (error) {
    return errorHandler.serverError(res, error);
  }
}

async function delSale(req, res) {
  try {
    const { id } = req.params;
    const sale = await services.deleteSale(id);
    if (sale) return res.status(NO_CONTENT).end();
    return res.status(NOT_FOUND).json({ message: 'Sale not found' }); 
  } catch (error) {
    return errorHandler.serverError(res, error);
  }
}

module.exports = {
  allSales,
  saleById,
  registerNewSale,
  updtSale,
  delSale,
};
