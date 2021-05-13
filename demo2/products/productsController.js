const productsModel = require('./productsModel');
const productsView = require('./productsView');
const NotFound = require('../common/errors/notFound');

class ProductsController {

    getAllProducts = async (req, res, next) => {
        try {
            const products = await productsModel.getProducts('products');
            productsView.productsView(res, products);
        }
        catch {
            next(new NotFound);
        }
        
    }


    getProduct = async (req, res,next) => {
        const { id } = req.params;
        try {
            const product = await productsModel.getProduct(id);
            productsView.productView(res, product);
        }
        catch {
            next(new NotFound);
        }
    };

    search = async (req, res) => {
        const { categories, products, manufactures } = req.query;
        let result;

        if (manufactures && categories && products) {
            
                result = await productsModel.getProducts('all', products, manufactures, categories.split(','));
                productsView.productsView(res,result);

        }

        else if (products && manufactures) {
    
            result = await productsModel.getProducts('prodMan', products, manufactures);
            productsView.productsView(res, result);
        } 
        else if (products && categories) {

            result = await productsModel.getProducts('prodCat', products, categories.split(','));
            productsView.productsView(res,result);

        } 
        else if (manufactures && categories) {

            result = await productsModel.getProducts('manCat', manufactures, categories.split(','));
            productsView.productsView(res, result);

        }
        else if (categories) {

            // get all products with certain categories
            result = await productsModel.getCategories(categories.split(','));
            productsView.productsView(res, result);

        } 
        else if (products || manufactures) {

            // get all products which names contain these letters
            if (products) {
                result = await productsModel.getProducts('prodLetters', products);
                productsView.productsView(res, result);
            }
            // get all products which manufacture contain these letters
            else if (manufactures) {
                result = await productsModel.getProducts('manLetters', manufactures);
                productsView.productsView(res, result);
            }
        }
        else {
            productsView.notFoundView(res,false);
        }
    }

}

module.exports = new ProductsController();
