const express = require('express');
const orderRoutes = express.Router();
const orderController = require('../controllers/orderController');
const validator = require('express-joi-validation').createValidator({})
const authMidlware = require('../common/midlwares/authMidlware');
const orderMidlware = require('../common/midlwares/orderMidlware');
const userDto = require('../common/dto/authDto');
const orderDto = require('../common/dto/orderDto');

orderRoutes.post('/', validator.headers(userDto), authMidlware, validator.body(orderDto), orderMidlware, orderController.postOrder);


module.exports = orderRoutes;