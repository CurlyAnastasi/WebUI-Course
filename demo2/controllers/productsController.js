const productsModel = require('../models/productsModel');
const productsView = require('../views/productsView');


class ProductsController {
    
    getAllProducts = async (req, res) => {
        productsModel.getProducts('all').then(result => productsView.productsView(res, result.rows));
    };

    getProduct = async (req, res) => {
        const { id } = req.params;
        productsModel.getProduct(id).then(result => productsView.productView(res, result.rows, id));
    };

    search = async (req, res) => {
        const { categories, products, manufactures } = req.query;

        if (manufactures && categories && products) {

            // check that data is valid and contains just letters
            const isValid = await productsModel.numbersValidation(categories.split(','));
            if (!isValid) await productsView.productsView(res, false);
            const productsValid = await productsModel.stringValidation(products);
            if (!productsValid) await productsView.productsView(res, false);
            const manufacturesValid = await productsModel.stringValidation(manufactures);
            if (!manufacturesValid) await productsView.productsView(res, false);

            productsModel.getProducts('allIn',products, manufactures, categories).then(result => productsView.productsView(res,result.rows));

        }
        else if (products && manufactures) {
            // check that data is valid and contains just letters
            const productsValid = await productsModel.stringValidation(products);
            if (!productsValid) await productsView.productsView(res, false);
            const manufactureValid = await productsModel.stringValidation(manufactures);
            if (!manufactureValid) await productsView.productsView(res, false);

            productsModel.getProducts('both', products, manufactures).then(result => productsView.productsView(res, result.rows));
        } 
        else if (products && categories) {

            // check that data is valid and contains just letters
            const productsValid = await productsModel.stringValidation(products);
            if (!productsValid) await productsView.productsView(res, false);

            productsModel.getProducts('in','product_name',products,categories).then(result => productsView.productsView(res,result.rows));

        } 
        else if (manufactures && categories) {

            // check that data is valid and contains just letters
            const manufacturesValid = await productsModel.stringValidation(manufactures);
            if (!manufacturesValid) await productsView.productsView(res, false);

            productsModel.getProducts('in','manufacture', manufactures, categories).then(result => productsView.productsView(res,result.rows));

        }
        else if (categories) {
            // get all products with certain categories
            productsModel.getCategories(categories).then(result => productsView.productsView(res,result.rows));

        } 
        else if (products || manufactures) {
            // check that data is valid and contains just letters
            const isValid = await productsModel.stringValidation(products || manufactures);
            if (!isValid) await productsView.productsView(res, false);

            // get all products which names contain these letters
            if (products) {
                productsModel.getProducts('letters', 'product_name', products).then(result => productsView.productsView(res, result.rows));
            }
            // get all products which manufacture contain these letters
            else if (manufactures) {
                productsModel.getProducts('letters', 'manufacture', manufactures).then(result => productsView.productsView(res, result.rows));
            }
        }
        else {
            productsView.notFoundView(res,false);
        }
    }

}

module.exports = ProductsController;
