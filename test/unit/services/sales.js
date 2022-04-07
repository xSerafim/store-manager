const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
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
    before(() => {
      sinon.stub(connection, "execute").resolves(mocks.insertId);
    });
    after(() => {
      connection.execute.restore();
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
  // describe('Testa função updateProduct', () => {
  //   describe('Caso o ID não exista', () => {
  //     before(() => {
  //       sinon.stub(connection, "execute").resolves([[]]);
  //     });
  //     after(() => {
  //       connection.execute.restore();
  //     });
  //     it('Connection é chamado uma vez', async () => {
  //       await services.updateProduct(mocks.product);
  //       expect(connection.execute.calledOnce).to.be.true;
  //     });
  //     it('Retorna false', async () => {
  //       const product = await services.updateProduct(mocks.product);
  //       expect(product).to.be.false;
  //     });
  //   });
  //   describe('Caso o ID exista', () => {
  //     before(() => {
  //       sinon.stub(connection, 'execute').resolves([[mocks.product]]);
  //     });
  //     after(() => {
  //       connection.execute.restore();
  //     });
  //     it('retorna o objeto esperado', async () => {
  //       const product = await services.updateProduct(1, 'Martelo de Thor', 10);
  //       expect(connection.execute.calledTwice).to.be.true;
  //       expect(product).to.be.deep.equal(...mocks.product);
  //     });
  //   });
  // });
  // describe('Testa função deleteProduct', () => {
  //   describe('Caso o ID não exista', () => {
  //     before(() => {
  //       sinon.stub(connection, "execute").resolves([[]]);
  //     });
  //     after(() => {
  //       connection.execute.restore();
  //     });
  //     it('Connection é chamado uma vez', async () => {
  //       await services.deleteProduct(1);
  //       expect(connection.execute.calledOnce).to.be.true;
  //     });
  //     it('Retorna false', async () => {
  //       const product = await services.deleteProduct(1);
  //       expect(product).to.be.false;
  //     });
  //   });
  //   describe('Caso o ID exista', () => {
  //     before(() => {
  //       sinon.stub(connection, 'execute').resolves([[mocks.product]]);
  //     });
  //     after(() => {
  //       connection.execute.restore();
  //     });
  //     it('retorna o objeto esperado', async () => {
  //       const product = await services.deleteProduct(1);
  //       expect(connection.execute.calledTwice).to.be.true;
  //       expect(product).to.be.true;
  //     });
  //   });
  // });
});