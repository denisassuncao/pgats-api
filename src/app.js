const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const userController = require('./controller/userController');
const authController = require('./controller/authController');
const transferController = require('./controller/transferController');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', userController);
app.use('/auth', authController);
app.use('/transfer', transferController);

module.exports = app;
