const connection = require('./connection');

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
  const [result] = await connection.execute(
    `SELECT
      sale_id AS saleId,
      sale.date AS date,
      product_id AS productId,
      quantity
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS sale
    ON sp.sale_id = sale.id
    WHERE sp.sale_id = ?
    ORDER BY saleId, productId;`,
    [id],
  );
  return result;  
}

module.exports = {
  getAllSales,
  getSaleById,
};