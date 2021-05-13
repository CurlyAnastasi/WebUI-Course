
const  db  = require('../db/db');
const { Op } = require("sequelize");


class OrderModel {
    // insertUser = async (user) => {
    //     return await pool.query(`INSERT INTO users (name,phone,email) VALUES ('${user.name}','${user.phone}','${user.email}') RETURNING id;`)
    // };

    insertOrder = async (id) => {
        const order = await db.orders.create({user_id:`${id}`});
        return order.id;
    };

    insertOrderItems = (products, orderID) => {
        for (let el of products) {
            db.orderItems.create({
                product_id: `${el.id}`,
                order_id: `${orderID}`,
                amount: `${el.count}`
            })
        }
    };

    addOrder = async (user, products) => {

        // add order and return order id
        const orderID = await this.insertOrder(user.id);

        // add products from order to products_items table
        this.insertOrderItems(products, orderID);

        return orderID;
    }

    getUser = async (phone, password) => {
        const result = await db.users.findAll({
            where:{
                phone:`${phone}`,
                password:`${password}`
            }
        });
        return result;
    };

    getProductsInfo = async (products) => {

        let result = [];

        for (let el of products) {
            result.push(await db.products.findOne({
                where: {
                    id: `${el.id}`
                },
                include: [db.categories, db.manufactures, db.units]
            }))
        };
        let resObj = result.map(product => {
            return Object.assign(
                {},
                {
                    id:product.id,
                    product_name:product.product_name,
                    price: product.price,
                    amount: product.amount,
                    unit: product.unit.unit
                }
            )
        });
        return resObj;

    }
    
    productsValidation = async (products) => {
        for (let el of products) {

            // check that there are products with such id and amount
            const isProduct = await db.products.findAll({
                where:{
                    id:`${el.id}`,
                    amount: {[Op.gt]: `${el.count}`
                }
            }});
            if (isProduct.length <= 0) return false;
        }
        return true;
    }
};


module.exports = new OrderModel();