const sinon = require('sinon');
const { expect } = require('chai');

const services = require('../../../services/sales');
const controller = require('../../../controllers/sales');
const mocks = require('../mocks/salesData');

describe('Testa camada controllers de sales', () => {
  describe('Testa função allSales', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
    });

    describe('Caso não de erro', () => {
      before(() => {
        sinon.stub(services, 'getAllSales').resolves(1);
      });
      after(() => {
        services.getAllSales.restore();
      });
      it('Retorna status e mensagem', async () => {
         await controller.allSales(request, response);
         expect(response.status.calledWith(200)).to.be.true;
         expect(response.json.calledWith(1)).to.be.true;
      });
    });

    describe('Caso de erro', () => {
      before(() => {
        sinon.stub(services, 'getAllSales').throws(() => new Error('Deu Ruim'));
      });
      after(() => {
        services.getAllSales.restore();
      });
      it('Retorna status 500 e mensagem "Erro no servidor"', async () => {
        await controller.allSales(request, response);
        expect(response.status.calledWith(500)).to.be.true;
        expect(response.json.calledWith({ message: 'Erro no servidor' })).to.be.true;
      });
    });
  });

  describe('Testa função saleById', () => {
    const response = {};
    const request = {};
    request.params =  { id: 4 };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
    });

    describe('Caso ID não seja encontrado', () => {
      before(() => {
        sinon.stub(services, 'getSaleById').resolves([]);
      });
      after(() => {
        services.getSaleById.restore();
      });
      it('Retorna status 404 e mensagem "Sale not found"', async () => {
        await controller.saleById(request, response);
        expect(response.status.calledWith(404)).to.be.true;
        expect(response.json.calledWith({ message: 'Sale not found' })).to.be.true;
      });
    });

    describe('Caso ID seja encontrado', () => {
      before(() => {
        sinon.stub(services, 'getSaleById').resolves(mocks.sale);
      });
      after(() => {
        services.getSaleById.restore();
      });
      it('Retorna status 200 e sales', async () => {
        await controller.saleById(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith(mocks.sale)).to.be.true;
      });
    });

    describe('Caso de erro', () => {
      before(() => {
        sinon.stub(services, 'getSaleById').throws(() => new Error('Deu Ruim'));
      });
      after(() => {
        services.getSaleById.restore();
      });
      it('Retorna status 500 e mensagem "Erro no servidor"', async () => {
        await controller.saleById(request, response);
        expect(response.status.calledWith(500)).to.be.true;
        expect(response.json.calledWith({ message: 'Erro no servidor' })).to.be.true;
      });
    });
  });

  describe('Testa função registerNewSale', () => {
    const response = {};
    const request = {};
    request.body = mocks.newSale;

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
    });

    describe('Caso a venda seja cadastrada', () => {
      before(() => {
        sinon.stub(services, 'registerSale').resolves(mocks.newSale);
      });
      after(() => {
        services.registerSale.restore();
      });
      it('Retorna status 201 e newSales', async () => {
        await controller.registerNewSale(request, response);
        expect(response.status.calledWith(201)).to.be.true;
        expect(response.json.calledWith(mocks.newSale)).to.be.true;
      });
    });

    describe('Caso a quantidade de produtos em estoque seja menor que 0', () => {
      before(() => {
        sinon.stub(services, 'registerSale').resolves(false);
      });
      after(() => {
        services.registerSale.restore();
      });
      it('Retorna status 422 e mensagem de erro', async () => {
        await controller.registerNewSale(request, response);
        expect(response.status.calledWith(422)).to.be.true;
        expect(response.json.calledWith({ message: 'Such amount is not permitted to sell' })).to.be.true;
      });
    });

    describe('Caso de erro', () => {
      before(() => {
        sinon.stub(services, 'registerSale').throws(() => new Error('Deu Ruim'));
      });
      after(() => {
        services.registerSale.restore();
      });
      it('Retorna status 500 e mensagem "Erro no servidor"', async () => {
        await controller.registerNewSale(request, response);
        expect(response.status.calledWith(500)).to.be.true;
        expect(response.json.calledWith({ message: 'Erro no servidor' })).to.be.true;
      });
    });
  });

  describe('Testa função updtSale', () => {
    const response = {};
    const request = {};
    request.params =  { id: 4 };
    request.body = mocks.newSale;

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
    });

    describe('Caso ID seja encontrado', () => {
      before(() => {
        sinon.stub(services, 'updateSale').resolves(mocks.newSale);
      });
      after(() => {
        services.updateSale.restore();
      });
      it('Retorna status 200 e venda atualizada', async () => {
        await controller.updtSale(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith(mocks.newSale)).to.be.true;
      });
    });

    describe('Caso ID não seja encontrado', () => {
      before(() => {
        sinon.stub(services, 'updateSale').resolves(false);
      });
      after(() => {
        services.updateSale.restore();
      });
      it('Retorna status 404 e mensagem "Sale not found"', async () => {
        await controller.updtSale(request, response);
        expect(response.status.calledWith(404)).to.be.true;
        expect(response.json.calledWith({ message: 'Sale not found' })).to.be.true;
      });
    });

    describe('Caso de erro', () => {
      before(() => {
        sinon.stub(services, 'updateSale').throws(() => new Error('Deu Ruim'));
      });
      after(() => {
        services.updateSale.restore();
      });
      it('Retorna status 500 e mensagem "Erro no servidor"', async () => {
        await controller.updtSale(request, response);
        expect(response.status.calledWith(500)).to.be.true;
        expect(response.json.calledWith({ message: 'Erro no servidor' })).to.be.true;
      });
    });
  });

  describe('Testa função delSale', () => {
    const response = {};
    const request = {};
    request.params = { id: 4 };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      response.end = sinon.stub().returns(response);
    });

    describe('Caso a venda exista', () => {
      before(() => {
        sinon.stub(services, 'deleteSale').resolves(true);
      });
      after(() => {
        services.deleteSale.restore();
      });
      it('Retorna status 204', async () => {
        await controller.delSale(request, response);
        expect(response.status.calledWith(204)).to.be.true;
        expect(response.end.called).to.be.true;
      });
    });

    describe('Caso a venda não exista', () => {
      before(() => {
        sinon.stub(services, 'deleteSale').resolves(false);
      });
      after(() => {
        services.deleteSale.restore();
      });
      it('Retorna status 404 e mensagem "Sale not found"', async () => {
        await controller.delSale(request, response);
        expect(response.status.calledWith(404)).to.be.true;
        expect(response.json.calledWith({ message: 'Sale not found' })).to.be.true;
      });
    });

    describe('Caso de erro', () => {
      before(() => {
        sinon.stub(services, 'deleteSale').throws(() => new Error('Deu Ruim'));
      });
      after(() => {
        services.deleteSale.restore();
      });
      it('Retorna status 500 e mensagem "Erro no servidor"', async () => {
        await controller.delSale(request, response);
        expect(response.status.calledWith(500)).to.be.true;
        expect(response.json.calledWith({ message: 'Erro no servidor' })).to.be.true;
      });
    });
  });
});