const orderModel = require('../../orders/orderModel');
const NotFound = require('../errors/notFound');

module.exports = async (req,res,next) => {
    const {phone, password } = req.headers;
    const isUser =  await orderModel.getUser(phone,password);
    
    if (isUser.length > 0) {
        res.locals.user = isUser[0];
        res.locals.isAuthenticated = true;
    }else {
        res.locals.isAuthenticated = false;
        next(new NotFound(401, "There is not such user in DB"));
    }
    next ();
}
