const allProducts = [
  { id: 1, name: 'Martelo de Thor', quantity: 10 },
  { id: 2, name: 'Traje de encolhimento', quantity: 20 },
  { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
];

const products = [
  [ { id: 1, name: 'Martelo de Thor', quantity: 10 } ],
  [ { id: 2, name: 'Traje de encolhimento', quantity: 20 } ]
];

const product = [{ id: 1, name: 'Martelo de Thor', quantity: 10 }];

const newProduct = { id: 4, name: 'Laço da Verdade', quantity: 15 };

const productInfos = [4, 'Laço da Verdade', 15];

const insertId = [{insertId: 4}];

const sales = [{ id: 1, quantity: 5 }, { id: 3, quantity: 18 }];

const salesProducts = [{
  productId: 1,
  quantity: 5,
  },
  {
    productId: 2,
    quantity: 10,
  },
];

module.exports = {
  allProducts,
  product,
  newProduct,
  insertId,
  products,
  productInfos,
  sales,
  salesProducts,
};
