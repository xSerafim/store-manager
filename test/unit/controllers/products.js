const sinon = require('sinon');
const { expect } = require('chai');

const services = require('../../../services/products');
const controller = require('../../../controllers/products');
const mocks = require('../mocks/productsData');

describe('Testa camada Controller de products', () => {
  describe('Testa função getAllProducts', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
    });

    describe('Caso não de erro', () => {
      before(() => {
        sinon.stub(services, 'allProducts').resolves(1);
      });
      after(() => {
        services.allProducts.restore();
      });
      it('Retorna status e mensagem', async () => {
         await controller.getAllProducts(request, response);
         expect(response.status.calledWith(200)).to.be.true;
         expect(response.json.calledWith(1)).to.be.true;
      });
    });

    describe('Caso de erro', () => {
      before(() => {
        sinon.stub(services, 'allProducts').throws(() => new Error('Deu Ruim'));
      });
      after(() => {
        services.allProducts.restore();
      });
      it('Retorna status 500 e mensagem "Erro no servidor"', async () => {
        await controller.getAllProducts(request, response);
        expect(response.status.calledWith(500)).to.be.true;
        expect(response.json.calledWith({ message: 'Erro no servidor' })).to.be.true;
      });
    });
  });

  describe('Testa função getProductById', () => {
    const response = {};
    const request = {};
    request.params =  { id: 4 };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
    });

    describe('Caso ID não seja encontrado', () => {
      before(() => {
        sinon.stub(services, 'productById').resolves([]);
      });
      after(() => {
        services.productById.restore();
      });
      it('Retorna status 404 e mensagem "Product not found"', async () => {
        await controller.getProductById(request, response);
        expect(response.status.calledWith(404)).to.be.true;
        expect(response.json.calledWith({ message: 'Product not found' })).to.be.true;
      });
    });

    describe('Caso ID seja encontrado', () => {
      before(() => {
        sinon.stub(services, 'productById').resolves([mocks.product]);
      });
      after(() => {
        services.productById.restore();
      });
      it('Retorna status 204 e mensagem product', async () => {
        await controller.getProductById(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith(mocks.product)).to.be.true;
      });
    });

    describe('Caso de erro', () => {
      before(() => {
        sinon.stub(services, 'productById').throws(() => new Error('Deu Ruim'));
      });
      after(() => {
        services.productById.restore();
      });
      it('Retorna status 500 e mensagem "Erro no servidor"', async () => {
        await controller.getProductById(request, response);
        expect(response.status.calledWith(500)).to.be.true;
        expect(response.json.calledWith({ message: 'Erro no servidor' })).to.be.true;
      });
    });
  });

  describe('Testa função postProduct', () => {
    const response = {};
    const request = {};
    request.body = mocks.product;

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
    });

    describe('Caso o produto não exista', () => {
      before(() => {
        sinon.stub(services, 'createProduct').resolves(mocks.product);
      });
      after(() => {
        services.createProduct.restore();
      });
      it('Retorna status 201 e mensagem e o produto criado', async () => {
        await controller.postProduct(request, response);
        expect(response.status.calledWith(201)).to.be.true;
        expect(response.json.calledWith(mocks.product)).to.be.true;
      });
    });

    describe('Caso o produto exista', () => {
      before(() => {
        sinon.stub(services, 'createProduct').resolves(false);
      });
      after(() => {
        services.createProduct.restore();
      });
      it('Retorna status 409 e mensagem "Product already exists"', async () => {
        await controller.postProduct(request, response);
        expect(response.status.calledWith(409)).to.be.true;
        expect(response.json.calledWith({ message: 'Product already exists' })).to.be.true;
      });
    });

    describe('Caso de erro', () => {
      before(() => {
        sinon.stub(services, 'createProduct').throws(() => new Error('Deu Ruim'));
      });
      after(() => {
        services.createProduct.restore();
      });
      it('Retorna status 500 e mensagem "Erro no servidor"', async () => {
        await controller.postProduct(request, response);
        expect(response.status.calledWith(500)).to.be.true;
        expect(response.json.calledWith({ message: 'Erro no servidor' })).to.be.true;
      });
    });
  });

  describe('Testa função putProduct', () => {
    const response = {};
    const request = {};
    request.params = { id: 4 };
    request.body = { name: 'Hulk', quantity: 10 };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
    });

    describe('Caso o produto exista', () => {
      before(() => {
        sinon.stub(services, 'updateProduct').resolves(mocks.product);
      });
      after(() => {
        services.updateProduct.restore();
      });
      it('Retorna status 200 e mensagem e o produto', async () => {
        await controller.putProduct(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith(mocks.product)).to.be.true;
      });
    });

    describe('Caso o produto não exista', () => {
      before(() => {
        sinon.stub(services, 'updateProduct').resolves(false);
      });
      after(() => {
        services.updateProduct.restore();
      });
      it('Retorna status 404 e mensagem "Product not found"', async () => {
        await controller.putProduct(request, response);
        expect(response.status.calledWith(404)).to.be.true;
        expect(response.json.calledWith({ message: 'Product not found' })).to.be.true;
      });
    });

    describe('Caso de erro', () => {
      before(() => {
        sinon.stub(services, 'updateProduct').throws(() => new Error('Deu Ruim'));
      });
      after(() => {
        services.updateProduct.restore();
      });
      it('Retorna status 500 e mensagem "Erro no servidor"', async () => {
        await controller.putProduct(request, response);
        expect(response.status.calledWith(500)).to.be.true;
        expect(response.json.calledWith({ message: 'Erro no servidor' })).to.be.true;
      });
    });
  });

  describe('Testa função delProduct', () => {
    const response = {};
    const request = {};
    request.params = { id: 4 };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      response.end = sinon.stub().returns(response);
    });

    describe('Caso o produto exista', () => {
      before(() => {
        sinon.stub(services, 'deleteProduct').resolves(true);
      });
      after(() => {
        services.deleteProduct.restore();
      });
      it('Retorna status 204', async () => {
        await controller.delProduct(request, response);
        expect(response.status.calledWith(204)).to.be.true;
        expect(response.end.called).to.be.true;
      });
    });

    describe('Caso o produto não exista', () => {
      before(() => {
        sinon.stub(services, 'deleteProduct').resolves(false);
      });
      after(() => {
        services.deleteProduct.restore();
      });
      it('Retorna status 404 e mensagem "Product not found"', async () => {
        await controller.delProduct(request, response);
        expect(response.status.calledWith(404)).to.be.true;
        expect(response.json.calledWith({ message: 'Product not found' })).to.be.true;
      });
    });

    describe('Caso de erro', () => {
      before(() => {
        sinon.stub(services, 'deleteProduct').throws(() => new Error('Deu Ruim'));
      });
      after(() => {
        services.deleteProduct.restore();
      });
      it('Retorna status 500 e mensagem "Erro no servidor"', async () => {
        await controller.delProduct(request, response);
        expect(response.status.calledWith(500)).to.be.true;
        expect(response.json.calledWith({ message: 'Erro no servidor' })).to.be.true;
      });
    });
  });
});