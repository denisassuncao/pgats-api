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
  });
});
