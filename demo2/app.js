const express = require('express');
const app = express();
const productsRoutes = require('./routes/productsRoute');
const orderRoutes = require('./routes/orderRoutes');
const morgan = require('morgan');
const errorHandler = require('./common/errors/errorsHandler');
const port = '3000';

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));

// Database
const db = require('./db/db');

try {
    db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


app.use('/products',productsRoutes);
app.use('/order', orderRoutes);

app.use(errorHandler);

app.listen(port, console.log(`Server started on port ${port}`));