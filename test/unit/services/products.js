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
      before(() => {
        const stub = sinon.stub(connection, 'execute');
        stub
          .onCall(0)
          .resolves([[]])
          .onCall(1)
          .resolves([{insertId: 1}]);
      });
      afterEach(() => {
        connection.execute.restore();
      });
      it('retorna o objeto esperado', async () => {
        const product = await services.createProduct(...mocks.product);
        expect(connection.execute.calledTwice).to.be.true;
        expect(product).to.be.deep.equal(...mocks.product);
      });
    });
  });
  describe('Testa função updateProduct', () => {
    describe('Caso o ID não exista', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[]]);
      });
      after(() => {
        connection.execute.restore();
      });
      it('Connection é chamado uma vez', async () => {
        await services.updateProduct(mocks.product);
        expect(connection.execute.calledOnce).to.be.true;
      });
      it('Retorna false', async () => {
        const product = await services.updateProduct(mocks.product);
        expect(product).to.be.false;
      });
    });
    describe('Caso o ID exista', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[mocks.product]]);
      });
      after(() => {
        connection.execute.restore();
      });
      it('retorna o objeto esperado', async () => {
        const product = await services.updateProduct(1, 'Martelo de Thor', 10);
        expect(connection.execute.calledTwice).to.be.true;
        expect(product).to.be.deep.equal(...mocks.product);
      });
    });
  });
  describe('Testa função deleteProduct', () => {
    describe('Caso o ID não exista', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[]]);
      });
      after(() => {
        connection.execute.restore();
      });
      it('Connection é chamado uma vez', async () => {
        await services.deleteProduct(1);
        expect(connection.execute.calledOnce).to.be.true;
      });
      it('Retorna false', async () => {
        const product = await services.deleteProduct(1);
        expect(product).to.be.false;
      });
    });
    describe('Caso o ID exista', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[mocks.product]]);
      });
      after(() => {
        connection.execute.restore();
      });
      it('retorna o objeto esperado', async () => {
        const product = await services.deleteProduct(1);
        expect(connection.execute.calledTwice).to.be.true;
        expect(product).to.be.true;
      });
    });
  });
  describe('Testa função updateQuantity', () => {
    describe('Chama as funções productById e updateQuantity', () => {
      beforeEach(() => {
        sinon.stub(model, 'updateQuantity');
        sinon.stub(model, 'getProductById')
          .onCall(0)
          .resolves(mocks.products[0])
          .onCall(1)
          .resolves(mocks.products[1]);
      });
      afterEach(() => {
        model.getProductById.restore();
        model.updateQuantity.restore();
      });
      it('Caso operation seja deleteSale', async () => {
        await services.updateQuantity(mocks.salesProducts, 'deleteSale');
        expect(model.getProductById.calledTwice).to.be.true;
        expect(model.updateQuantity.calledOnce).to.be.true;
      });
      it('Caso operation seja registerSale', async () => {
        await services.updateQuantity(mocks.salesProducts, 'registerSale');
        expect(model.getProductById.calledTwice).to.be.true;
        expect(model.updateQuantity.calledOnce).to.be.true;
      });
    });
  });
});