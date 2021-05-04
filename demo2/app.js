const express = require('express');
const app = express();
const productsRoutes = require('./routes/productsRoute');
const orderRoutes = require('./routes/orderRoutes');
const morgan = require('morgan');
const erorHandler = require('./common/errors/errorsHandler');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));

app.use('/products',productsRoutes);
app.use('/order', orderRoutes);

app.use(erorHandler);

app.listen('3000');