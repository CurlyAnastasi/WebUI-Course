const orderModel = require('../models/orderModel');
const orderView = require('../views/orderView');
const Mailer = require('../mailer/mailer');

class OrderController {
    postOrder = async (req,res) => {
        const {user,products} = res.locals;
        
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