const orderModel = require('../models/orderModel');
const orderView = require('../views/orderView');
const Mailer = require('../mailer/mailer');

class OrderController {
    postOrder = async (req, res) => {
        const { products, user } = req.body;

        // check that user and products values are valid and return error if not
        const userValid = await orderModel.userValidation(user);
        if (!userValid) return await orderView.sendError(req,res,'user');
        const productsValid = await orderModel.productsValidation(products);
        if (!productsValid) return await orderView.sendError(req,res,'products');
        
        // add order data to DB
        const orderID = await orderModel.addOrder(user,products);
        const productsInfo = await orderModel.getProductsInfo(products);
        
        // display ok message
        orderView.sendOkMsg(req,res);

        // send letter 
        Mailer.main(user, productsInfo.rows, orderID).catch(console.error);
    }
}


module.exports = new OrderController();