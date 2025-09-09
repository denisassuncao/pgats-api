// bibliotecas de teste
const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');

// aplicação
const app = require('../../app');

// serviço real (será mocado quando necessário)
const transferService = require('../../service/transferService');

describe('Transfer Controller', () => {
  // limpa qualquer stub/spy após cada teste
  afterEach(() => sinon.restore());

  describe('POST /transfer', () => {
    it('Quando informo remetente e destinatário inexistentes, retorna status 400', async () => {
      const resposta = await request(app)
        .post('/transfer')
        .send({
          from: 'denis',
          to: 'maria',
          value: 100,
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
    });

    it('Usando Mocks: Quando informo remetente e destinatário inexistentes, retorna status 400', async () => {
      // mocar apenas a função transfer do serviço
      const transferServiceMock = sinon.stub(transferService, 'transfer');
      transferServiceMock.throws(new Error('Usuário remetente ou destinatário não encontrado'));

      const resposta = await request(app)
        .post('/transfer')
        .send({
          from: 'denis',
          to: 'maria',
          value: 100,
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');

      sinon.restore(); // restaurar o serviço original
    });

    it.only('Usando Mocks: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
      // Mockar apenas a função transfer do Service
      const transferServiceMock = sinon.stub(transferService, 'transfer');
      transferServiceMock.returns({
        from: "julio",
        to: "priscila",
        value: 100,
        date: new Date().toISOString()
      });

      const resposta = await request(app)
        .post('/transfer')
        .send({ from: 'julio', to: 'priscila', value: 100 });

      expect(resposta.status).to.equal(201);
      expect(resposta.body).to.have.property('from', 'julio');
      expect(resposta.body).to.have.property('to', 'priscila');
      expect(resposta.body).to.have.property('value', 100);

      // Reseto o Mock
      sinon.restore();
    });
  });
});
