const express = require('express');
const orderRoutes = express.Router();
const orderController = require('../orders/orderController');
const validator = require('express-joi-validation').createValidator({});
const authMiddleware = require('../common/midlwares/authMiddleware');
const userDto = require('../common/dto/authDto');
const orderDto = require('../common/dto/orderDto');

orderRoutes.post('/', validator.headers(userDto), authMiddleware, validator.body(orderDto), orderController.postOrder);


module.exports = orderRoutes;