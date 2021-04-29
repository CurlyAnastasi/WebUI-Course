const express = require('express');
const productsRoutes = express.Router();
const ProductsController = require('../controllers/productsController');
const productsController = new ProductsController ();

productsRoutes.get('/',productsController.getAllProducts);
productsRoutes.get('/search', productsController.search);
productsRoutes.get('/:id',productsController.getProduct);


module.exports = productsRoutes;