const pool = require('./db');

class Products {
    async getProducts(type, search, value, ids) {
        console.log(value)
        switch (type) {
            case 'all':
                return await pool.query(`SELECT p.id,p.product_name as name,m.manufacture,c.category FROM products p  
            JOIN manufactures m ON m.id = p.manufacture_id JOIN categories c ON c.id = p.category_id;`);

            case 'letters':
                return await pool.query(`SELECT p.id,product_name as name, manufacture,category,unit, price,img_link as img FROM products p 
            JOIN units u ON u.id = p.unit_id JOIN categories c ON c.id = p.category_id JOIN manufactures m ON m.id = p.manufacture_id 
            WHERE ${search} LIKE '%${value.toLowerCase()}%' OR ${search} LIKE '%${value.toUpperCase()}%';`);

            case 'both':
                return await pool.query(`SELECT p.id,product_name as name, manufacture,category,unit, price,img_link as img FROM products p 
                JOIN units u ON u.id = p.unit_id JOIN categories c ON c.id = p.category_id JOIN manufactures m ON m.id = p.manufacture_id 
                WHERE product_name LIKE '%${search.toLowerCase()}%' OR product_name LIKE '%${search.toUpperCase()}%' AND manufacture LIKE '%${value}%';`);

            case 'in':
                return await pool.query(`SELECT p.id,product_name as name, manufacture,category,unit, price,img_link as img FROM products p 
                JOIN units u ON u.id = p.unit_id JOIN categories c ON c.id = p.category_id JOIN manufactures m ON m.id = p.manufacture_id 
                WHERE ${search} LIKE '%${value}%' AND c.id IN (${ids});`);

            case 'allIn':
                return await pool.query(`SELECT p.id,product_name as name, manufacture,category,unit, price,img_link as img FROM products p 
                    JOIN units u ON u.id = p.unit_id JOIN categories c ON c.id = p.category_id JOIN manufactures m ON m.id = p.manufacture_id 
                    WHERE product_name LIKE '%${search}%' AND manufacture LIKE '%${value}%' AND c.id IN (${ids});`)
        }

    };

    async getProduct(id) {
        return await pool.query(`SELECT p.id,product_name as name,manufacture,category,unit as units,price,ingridients FROM products p  JOIN manufactures m ON m.id = p.manufacture_id JOIN categories c ON c.id = p.category_id JOIN units u ON u.id = p.unit_id and p.id = ${id};`);
    };

    async getCategories(values) {

        return await pool.query(`SELECT p.id, product_name as name, manufacture, c.category FROM products p JOIN manufactures m ON m.id = p.manufacture_id JOIN categories c ON c.id = p.category_id WHERE c.id IN (${values})`);
    };

    async stringValidation(value) {
        // check that string includes just letters
        return (value.match(/[^A-Z]/ig)) ? false : true;
    };

    async numbersValidation(value) {
        return value.every(el => Number(el));
    };
};



module.exports = new Products();