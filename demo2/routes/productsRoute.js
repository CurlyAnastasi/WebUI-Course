const express = require('express');
const productsRoutes = express.Router();
const productsController = require('../products/productsController');
const validator = require('express-joi-validation').createValidator({});
const paramsDto = require('../common/dto/paramsDto');

productsRoutes.get('/', productsController.getAllProducts);
productsRoutes.get('/search', validator.query(paramsDto), productsController.search);
productsRoutes.get('/:id',productsController.getProduct);


module.exports = productsRoutes;