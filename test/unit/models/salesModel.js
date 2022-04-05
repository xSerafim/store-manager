const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const model = require('../../../models/salesModel');
const mocks = require('../mocks/salesData');

describe('Testa salesModel', () => {
  describe('Testa função getAllSales', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([mocks.allSales]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Retorna um array de objetos igual o esperado', async () => {
      const sales = await model.getAllSales();
      expect(sales).to.be.deep.equal(mocks.allSales);
    });
    it('Connection é chamado', async () => {
      await model.getAllSales();
      expect(connection.execute.called).to.be.true;
    });
  });
  describe('Testa a função getSaleById', () => {
    describe('Caso o ID não seja encontrado', () => {
      after(() => {
        connection.execute.restore();
      });
      it('Retorna um array vazio caso o ID não seja encontrado', async () => {
        sinon.stub(connection, "execute").resolves([[]]);
  
        const sale = await model.getSaleById();
        expect(sale).to.be.an('array');
        expect(sale).to.have.lengthOf(0);
      });
    });
    describe('Caso o ID seja encontrado', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([mocks.sale]);
      });
      after(() => {
        connection.execute.restore();
      });
      it('Retorna um array de objetos igual o esperado', async () => {
        const sale = await model.getSaleById(1);
        expect(sale).to.be.deep.equal(mocks.sale);
      });
      it('Connection é chamado', async () => {
        await model.getSaleById(1);
        expect(connection.execute.called).to.be.true;
      });
    });
  });
  describe('Testa função registerSale', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves(mocks.insertId);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Retorna um array de objetos igual o esperado', async () => {
      const newSale = await model.registerSale(mocks.newSale);
      expect(newSale).to.be.deep.equal({ id: 4, itemsSold: mocks.newSale });
    });
    it('Connection é chamado', async () => {
      await model.registerSale(mocks.newSale);
      expect(connection.execute.called).to.be.true;
    });
  });
});