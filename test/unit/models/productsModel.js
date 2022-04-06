const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const model = require('../../../models/productsModel');
const mocks = require('../mocks/productsData');

describe('Testa productsModel', () => {
  describe('Testa função allProducts', () => {
    after(() => {
      connection.execute.restore();
    });
    it('Retorna um array de objetos igual o esperado', async () => {
      sinon.stub(connection, "execute").resolves([mocks.allProducts]);

      const products = await model.allProducts();
      expect(products).to.deep.equal(mocks.allProducts);
    });
  });
  describe('Testa função getProductById', () => {
    afterEach(() => {
      connection.execute.restore();
    });

    it('Retorna um array vazio, caso o ID não exista', async () => {
      sinon.stub(connection, "execute").resolves([[]]);

      const products = await model.getProductById(10);
      expect(products).to.be.an('array').that.is.empty;
    });
    it('Retorna um array com um objeto igual o esperado, caso o ID exista', async () => {
      sinon.stub(connection, "execute").resolves([mocks.product]);

      const products = await model.getProductById(1);
      expect(products).to.deep.equal(mocks.product);
    });
  });
  describe('Testa função findProductByName', () => {
    afterEach(() => {
      connection.execute.restore();
    });
    it('Caso o nome não exista, retorna um array vazio', async () => {
      sinon.stub(connection, "execute").resolves([[]]);

      const products = await model.findProductByName('Nome que não existe');
      expect(products).to.be.an('array').that.is.empty;
    });
    it('Caso o nome não exista, retorna um array com um objeto igual o esperado', async () => {
      sinon.stub(connection, "execute").resolves([mocks.product]);

      const products = await model.findProductByName('Martelo de Thor');
      expect(products).to.deep.equal(mocks.product);
    });
  });
  describe('Testa função createProduct', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves(mocks.insertId);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Retorna um objeto', async () => {
      const products = await model.createProduct('Laço da Verdade', 15);
      expect(products).to.be.an('object');
    });
    it('Retorna um objeto igual o esperado', async () => {
      const products = await model.createProduct('Laço da Verdade', 15);
      expect(products).to.deep.equal(mocks.newProduct);
    });
  });
  describe('Testa função updateProduct', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves();
    });
    after(() => {
      connection.execute.restore();
    });
    it('Retorna um objeto', async () => {
      const products = await model.updateProduct(...mocks.productInfos);
      expect(products).to.be.an('object');
    });
    it('Retorna um objeto igual o esperado', async () => {
      const products = await model.updateProduct(...mocks.productInfos);
      expect(products).to.deep.equal(mocks.newProduct);
    });
  });
  describe('Testa se a função deleteProduct', () => {
    before(() => {
      sinon.stub(connection, "execute");
    });
    after(() => {
      connection.execute.restore();
    });
    it('Chama o connection.execute com o argumento correto', async () => {
      await model.deleteProduct(1);
      expect(connection.execute.calledWith('DELETE FROM products WHERE id = ?;', [1])).to.be.true;
    });
  });
  describe('Testa função updateQuantity', () => {
    before(() => {
      sinon.stub(connection, "execute");
    });
    after(() => {
      connection.execute.restore();
    });
    it('Connection é chamado', async () => {
      await model.updateQuantity(mocks.sales);
      expect(connection.execute.calledTwice).to.be.true;
    });
  });
});