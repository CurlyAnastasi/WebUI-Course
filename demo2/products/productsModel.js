const db = require('../db/db');
const {Op} = require('sequelize');

class Products {
    resObj = (product) => {
            return Object.assign(
                {},
                {
                    id:product.id,
                    product_name:product.product_name,
                    price: product.price,
                    ingridients: product.ingridients,
                    amount: product.amount,
                    manufacture:product.manufacture.manufacture,
                    unit: product.unit.unit,
                    img_link: product.img_link,
                    category: product.category.category
                }
            )
    };

    async getProducts(type, search, value, ids) {
        let result;
        
        switch (type) {
            case 'products':
                result = await db.products.findAll({
                    include: [db.categories, db.manufactures, db.units]
                });

                result = result.map(product => {
                    return this.resObj(product)
                });

                return result;

            case 'prodLetters': 
            result = await db.products.findAll({
                where: {
                    product_name: {
                        [Op.substring] : search
                    }
                },
                include: [db.categories,db.manufactures,db.units]
            });
            
            result = result.map(product => {
                return this.resObj(product)
            })
            return result;

            case 'manLetters': 
            result = await db.products.findAll({
                include: [
                    {
                        model: db.manufactures,
                        where: {
                            manufacture: {
                                [Op.substring]: search
                            }
                            
                        }
                    },
                    {model:db.categories},
                    {model:db.units}
                ]
            });
            console.log
            result = result.map(product => {
                return this.resObj(product)
            })
            return result;

            case 'prodMan':
                result = await db.products.findAll({
                    where: {
                        product_name: {
                            [Op.substring] : search
                        }
                    },
                    include: [
                        {
                        model:db.categories
                        },
                        {
                        model: db.manufactures,
                        where: {
                            manufacture:{
                                [Op.substring]: value
                            }
                        }
                        },
                    {
                        model: db.units
                    }
                    ]
                });
                
                result = result.map(product => {
                    return this.resObj(product)
                })
                return result;

            case 'prodCat':
                value = value.map(el => Number(el));

                result = await db.products.findAll({
                    where: {
                        product_name: {
                            [Op.substring] : search
                        }
                    },
                    include: [
                        {
                        model:db.categories,
                        where: {
                            id: {[Op.in]: value}
                        }
                        },
                        {
                        model: db.manufactures
                        },
                    {
                        model: db.units
                    }
                    ]
                });
                
                result = result.map(product => {
                    return this.resObj(product)
                })
                return result;
            
            case 'manCat':
                
                    result = await db.products.findAll({
    
                        include: [
                            {
                            model:db.categories,
                            where: {
                                id: {[Op.in]: value}
                            }
                            },
                            {
                            model: db.manufactures,
                            where: {
                                manufacture:{
                                    [Op.substring]: search
                                }
                            }
                            },
                        {
                            model: db.units
                        }
                        ]
                    });
                    
                    result = result.map(product => {
                        return this.resObj(product)
                    })
                    
                    return result;

            case 'all':
                ids = ids.map(el => Number(el));

                result = await db.products.findAll({
                    where: {
                        product_name: {
                            [Op.substring] : search
                        }
                    },
                    include: [
                        {
                        model:db.categories,
                        where: {
                            id: {[Op.in]: ids}
                        }
                        },
                        {
                        model: db.manufactures,
                        where: {
                            manufacture:{
                                [Op.substring]: value
                            }
                        }
                        },
                    {
                        model: db.units
                    }
                    ]
                });
                
                result = result.map(product => {
                    return this.resObj(product)
                })
                return result;
        }
    };

    async getProduct(id) {
        let product = await db.products.findOne({
            where: {id},
            include: [db.categories,db.manufactures, db.units]
        });
        return  this.resObj(product);
    };

    async getCategories(values) {

        values = values.map(el => Number(el));

        let result = await db.products.findAll({
    
            include: [
                {
                model:db.categories,
                where: {
                    id: {[Op.in]: values}
                }
                },
                {
                model: db.manufactures,
                },
                {
                    model: db.units
                }
            ]
        });
       
        result = result.map(product => {
            return this.resObj(product)
        })
        
        return result;

    };

};



module.exports = new Products();