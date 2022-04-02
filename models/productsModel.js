const connection = require('./connection');

async function allProducts() {
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

async function updateProduct(id, name, quantity) {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;',
    [name, quantity, id],
  );

  return {
    id,
    name,
    quantity,
  };
}

async function deleteProduct(id) {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;',
    [id],
  );
}

module.exports = {
  allProducts,
  getProductById,
  findProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
};