# API de Transferências

API Restful em Node.js/Express para login, registro, consulta de usuários e transferências.

## Instalação

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie a API:
   ```bash
   npm start
   ```

## Endpoints
- `POST /auth/login` — Login de usuário
- `POST /users` — Registro de usuário
- `GET /users` — Consulta de usuários
- `POST /transfer` — Transferência de valores
- `GET /api-docs` — Documentação Swagger

## Regras de negócio
- Login exige usuário e senha.
- Não é permitido registrar usuários duplicados.
- Transferências para não favorecidos só são permitidas se o valor for menor que R$ 5.000,00.

## Testes
A API foi estruturada para facilitar testes automatizados com Supertest.
