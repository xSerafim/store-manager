const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const services = require('../../../services/products');
const model = require('../../../models/productsModel');
const mocks = require('../mocks/productsData');

describe('Testa camada de services products', () => {
  describe('Testa função allProducts', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([mocks.allProducts]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Retorna um array de objetos igual o esperado', async () => {  
      const products = await services.allProducts();
      expect(products).to.deep.equal(mocks.allProducts);
    });
    it('Connection é chamado', async () => {
      await services.updateQuantity(mocks.sales);
      expect(connection.execute.called).to.be.true;
    });
  });
  describe('Testa função productById', () => {
    afterEach(() => {
      connection.execute.restore();
    });
    it('Retorna um array vazio, caso o ID não exista', async () => {
      sinon.stub(connection, "execute").resolves([[]]);

      const products = await services.productById(10);
      expect(products).to.be.an('array').that.is.empty;
    });
    it('Retorna um array com um objeto igual o esperado, caso o ID exista', async () => {
      sinon.stub(connection, "execute").resolves([mocks.product]);

      const products = await services.productById(1);
      expect(products).to.deep.equal(mocks.product);
    });
    it('Connection é chamado', async () => {
      sinon.stub(connection, "execute").resolves([mocks.product]);

      await services.updateQuantity(mocks.sales);
      expect(connection.execute.called).to.be.true;
    });
  });
  describe('Testa função createProduct', () => {
    describe('Caso o nome já exista', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves(['Martelo de Thor']);
      });
      after(() => {
        connection.execute.restore();
      });
      it('Connection é chamado uma vez', async () => {
        await services.createProduct(mocks.product);
        expect(connection.execute.calledOnce).to.be.true;
      });
      it('Retorna false', async () => {
        const product = await services.createProduct(mocks.product);
        expect(product).to.be.false;
      });
    });
    describe('Caso o nome não exista', () => {
      afterEach(() => {
        connection.execute.restore();
      });

      it('Connection é chamado duas vezes', async () => {
        sinon.stub(connection, 'execute').resolves([[]]);

        await services.createProduct(mocks.product);
        expect(connection.execute.calledTwice).to.be.true;
      });
      // it('retorna um array vazio na primeira chamada e o objeto esperado na segunda', async () => {
      //   const stub = sinon.stub(connection, 'execute');
      //   stub
      //     .onCall(0)
      //     .returns([])
      //     .onCall(1)
      //     .returns('Martelo de Thor', 10);

      //   await services.createProduct(...mocks.product);
      //   expect(stub(), []).to.be.true;
      //   expect(connection.execute.returnThis(...mocks.product)).to.be.true;

      // });
    });
  });
});