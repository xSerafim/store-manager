const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const serviceProduct = require('../../../services/products');
const services = require('../../../services/sales');
const model = require('../../../models/salesModel');
const mocks = require('../mocks/salesData');

describe('Testa camada de services sales', () => {
  describe('Testa função getAllSales', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([mocks.allSales]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Retorna um array de objetos igual o esperado', async () => {  
      const sales = await services.getAllSales();
      expect(sales).to.deep.equal(mocks.allSales);
    });
    it('Connection é chamado', async () => {
      await services.getAllSales(mocks.allSales);
      expect(connection.execute.called).to.be.true;
    });
  });
  describe('Testa função getSaleById', () => {
    afterEach(() => {
      connection.execute.restore();
    });
    it('Retorna um array vazio, caso o ID não exista', async () => {
      sinon.stub(connection, "execute").resolves([[]]);

      const sales = await services.getSaleById(10);
      expect(sales).to.be.an('array').that.is.empty;
    });
    it('Retorna um array com um objeto igual o esperado, caso o ID exista', async () => {
      sinon.stub(connection, "execute").resolves([mocks.sale]);

      const sales = await services.getSaleById(1);
      expect(sales).to.deep.equal(mocks.sale);
    });
    it('Connection é chamado', async () => {
      sinon.stub(connection, "execute").resolves([mocks.sale]);

      await services.getSaleById(mocks.sale);
      expect(connection.execute.called).to.be.true;
    });
  });
  describe('Testa função registerSale', () => {
    describe('Caso updateQuantity seja false', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves(mocks.insertId);
        sinon.stub(serviceProduct, "updateQuantity").resolves(false);
      });
      after(() => {
        connection.execute.restore();
        serviceProduct.updateQuantity.restore();
      });
      it('Connection é chamado', async () => {
        await services.registerSale(mocks.newSale);
        expect(connection.execute.called).to.be.true;
      });
      it('Retorna o objeto esperado', async () => {
        const sales = await services.registerSale(mocks.newSale);
        expect(sales).to.be.deep.equal({ id: 4, itemsSold: mocks.newSale });
      });
    });
    describe('Caso updateQuantity seja true', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves(mocks.insertId);
        sinon.stub(serviceProduct, "updateQuantity").resolves(true);
      });
      after(() => {
        connection.execute.restore();
        serviceProduct.updateQuantity.restore();
      });
      it('Connection é chamado', async () => {
        await services.registerSale(mocks.newSale);
        expect(connection.execute.called).to.be.true;
      });
      it('Retorna o objeto esperado', async () => {
        const sales = await services.registerSale(mocks.newSale);
        expect(sales).to.be.false;
      });
    });
  });
  describe('Testa função updateSale', () => {
    describe('Caso o ID não exista', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[]]);
      });
      after(() => {
        connection.execute.restore();
      });
      it('Connection é chamado uma vez', async () => {
        await services.updateSale(mocks.sale);
        expect(connection.execute.calledOnce).to.be.true;
      });
      it('Retorna false', async () => {
        const sale = await services.updateSale();
        expect(sale).to.be.false;
      });
    });
    describe('Caso o ID exista', () => {
      before(() => {
        sinon.stub(model, 'getSaleById').returns(mocks.sale);
        sinon.stub(model, 'updateSale').returns({saleId: 1, itemUpdated: mocks.newSale});
      });
      after(() => {
        model.getSaleById.restore();
        model.updateSale.restore();
      });
      it('retorna o objeto esperado', async () => {
        const result = await services.updateSale(1, mocks.newSale);
        expect(result).to.be.deep.equal({saleId: 1, itemUpdated: mocks.newSale});
      });
    });
  });
  describe('Testa função deleteSale', () => {
    describe('Caso o ID não exista', () => {
      before(() => {
        sinon.stub(model, 'getSaleById').returns([]);
      });
      after(() => {
        model.getSaleById.restore();
      });
      it('Retorna false', async () => {
        const result = await services.deleteSale(1);
        expect(result).to.be.false;
      });
    });
    describe('Caso o ID exista', () => {
      before(() => {
        sinon.stub(model, 'getSaleById').returns(mocks.sale);
        sinon.stub(serviceProduct, 'updateQuantity');
        sinon.stub(model, 'deleteSale');
      });
      after(() => {
        model.getSaleById.restore();
        serviceProduct.updateQuantity.restore();
        model.deleteSale.restore();
      });
      it('Retorna true ', async () => {
        const result = await services.deleteSale(1);
        expect(result).to.be.true;
      });
    });
  });
});