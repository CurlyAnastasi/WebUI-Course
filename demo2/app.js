const express = require('express');
const app = express();
const productsRoutes = require('./routes/productsRoute');
const orderRoutes = require('./routes/orderRoutes');


app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use('/products',productsRoutes);
app.use('/order', orderRoutes);



app.listen('3000', () => {
    console.log('http://localhost:3000/products');
    console.log('http://localhost:3000/products/45052448');
    console.log('http://localhost:3000/order');
})