const orderModel = require('../models/orderModel');
const orderView = require('../views/orderView');
const Mailer = require('../mailer/mailer');
const NotFound = require('../common/errors/notFound');

class OrderController {
    postOrder = async (req,res,next) => {
        const {user} = res.locals;
        const {products} = req.body;

        // check that all products exist in DB
        const productsValid = await orderModel.productsValidation(products);
        
        if (!productsValid) {
            return next(new NotFound(404, "There is not such products in DB"));
        }

        // add order data to DB
        const orderID = await orderModel.addOrder(user,products);
        const productsInfo = await orderModel.getProductsInfo(products);
        
        // display ok message
        orderView.sendOkMsg(res);

        // send letter 
        Mailer.main(user, productsInfo.rows, orderID).catch(console.error);
    
    }
}


module.exports = new OrderController();