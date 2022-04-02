const connection = require('./connection');

async function getAllProducts() {
  const [result] = await connection.execute(
      'SELECT id, name, quantity FROM StoreManager.products ORDER BY id;',
  );
  return result;
}

async function getProductById(id) {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
);
  return result;
}

async function findProductByName(name) {
  const [result] = await connection.execute(
    'SELECT name FROM StoreManager.products WHERE name = ?;',
    [name],
  );
  return result;
}

async function createProduct(name, quantity) {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);',
    [name, quantity],
  );

  return {
    id: insertId,
    name,
    quantity,
  };
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
  getAllProducts,
  getProductById,
  findProductByName,
  createProduct,
  getAllSales,
  getSaleById,
};
