const connection = require('./connection');

async function getAllProducts() {
  const [result] = await connection.execute(
      'SELECT id, name, quantity FROM StoreManager.products ORDER BY id;',
  );
  return result;
}

async function getProductById(id) {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?;',
    [id],
);
  return result;
}

async function getAllSales() {
  const [result] = await connection.execute(
      `SELECT
        sale_id AS saleId,
        sale.date AS date,
        product_id AS productId,
        quantity
      FROM StoreManager.sales_products AS sp
      JOIN StoreManager.sales AS sale
      ON sp.sale_id = sale.id
      ORDER BY saleId, productId;`,
  );
  return result;
}

async function getSaleById(id) {
  const allSales = await getAllSales();
  const result = allSales.filter((e) => e.saleId === Number(id));
  return result;
}

module.exports = {
  getAllProducts,
  getProductById,
  getAllSales,
  getSaleById,
};
