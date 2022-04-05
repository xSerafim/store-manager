const { productById } = require('../services/products');

async function sumQuantity(sales) {
  console.log(sales);
  const productsById = sales.map((sale) => productById(sale.productId));
  const resolvedPromise = await Promise.all(productsById);

  console.log(resolvedPromise);

  return sales.map((sale, index) => (
    { id: sale.productId,
      quantity: resolvedPromise.flat()[index].quantity + sale.quantity,
    }));
}

async function subQuantity(sales) {
  console.log(sales);
  const productsById = sales.map((sale) => productById(sale.productId));
  const resolvedPromise = await Promise.all(productsById);

  console.log(resolvedPromise);

  return sales.map((sale, index) => (
    { id: sale,
      quantity: resolvedPromise.flat()[index].quantity - sale.quantity,
    }));
}

module.exports = {
  sumQuantity,
  subQuantity,
};