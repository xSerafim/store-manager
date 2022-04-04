const connection = require('./connection');

async function getAllSales() {
  const [result] = await connection.execute(
      `SELECT
        sale_id AS saleId,
        sale.date AS date,
        product_id AS productId,
        quantity
      FROM sales_products AS sp
      JOIN sales AS sale
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
    FROM sales_products AS sp
    JOIN sales AS sale
    ON sp.sale_id = sale.id
    WHERE sp.sale_id = ?
    ORDER BY saleId, productId;`,
    [id],
  );
  return result;  
}

async function registerSale(sales) {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (CURRENT_TIMESTAMP);',
  );

  sales.forEach(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [Number(insertId), productId, quantity],
    );
  });

  const bodyObj = {
    id: Number(insertId),
    itemsSold: sales.map(({ productId, quantity }) => ({ productId, quantity })),
  };
  return bodyObj;
}

// async function updateSale(id, sale) {

// }

module.exports = {
  getAllSales,
  getSaleById,
  registerSale,
};