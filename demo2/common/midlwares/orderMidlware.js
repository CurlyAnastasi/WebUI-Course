const orderModel = require('../../models/orderModel');
const NotFound = require('../errors/notFound');

module.exports = async (req,res,next) => {
    const {products } = req.body;
    const productsValid = await orderModel.productsValidation(products);
    if (productsValid) {
        res.locals.products = products;
    }else {
        next(new NotFound(404, "There is not such products in DB"));
    }
    next ();
}
