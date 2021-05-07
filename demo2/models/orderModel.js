const pool = require('./db');


class OrderModel {
    insertUser = async (user) => {
        return await pool.query(`INSERT INTO users (name,phone,email) VALUES ('${user.name}','${user.phone}','${user.email}') RETURNING id;`)
    };

    insertOrder = async (id) => {
        return await pool.query(`INSERT INTO orders (user_id) VALUES (${id}) RETURNING id;`);
    };

    insertOrderItems = async (products, orderID) => {
        for (let el of products) {
            await pool.query(`INSERT INTO order_items (product_id, order_id, amount) VALUES (${el.id}, ${orderID}, ${el.count});`)
        }
    };

    addOrder = async (user, products) => {

        // add order and return order id
        const orderID = await this.insertOrder(user.id).then(order => order.rows[0].id);

        // add products from order to products_items table
        this.insertOrderItems(products, orderID);

        return orderID;
    }

    getUser = async (phone, password) => {
        const result = await pool.query(`SELECT * FROM users WHERE phone = '${phone}' AND password = '${password}';`);
        return result.rows;
    };

    getProductsInfo = async (products) => {
        let query = `SELECT p.id, product_name, unit , price, amount FROM products p JOIN units u ON u.id = p.unit_id  WHERE `;

        for (let i = 0; i < products.length; i++) {
            query += i == products.length - 1 ? `p.id = ${products[i].id};` : `p.id = ${products[i].id} OR `
        };

        return pool.query(query);

    }
    
    productsValidation = async (products) => {
        for (let el of products) {
            // check that there are products with such id and amount
            const isProduct = await pool.query(`SELECT * FROM products WHERE id = '${el.id}' AND amount > ${el.count};`);
            return (isProduct.rows.length > 0) ? true : false;
        }
    }
};


module.exports = new OrderModel();