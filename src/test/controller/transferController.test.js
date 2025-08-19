//biblioteca de testes
const request = require('supertest');
const {expect} = require('chai');
const sinon = require('sinon');

//Aplicação
const app = require('../../app');

//Teste do controlador
describe('Transfer Controller', () => {
    describe('POST /transfer', () => {
        it('Quando informo remetente e destinatário inexistentes, retorna status 400', async() => {
            const resposta = await request(app)
            .post('/transfer')
            .send({ 
                from: "denis", 
                to: "maria", 
                value: 100
            });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado');
        });
    });

        describe('POST /transfer', () => {
        //teste
    });
});