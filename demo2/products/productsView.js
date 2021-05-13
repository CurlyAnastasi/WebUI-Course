const NotFound = require('../common/errors/notFound');

class ProductsView {

    messages = {
        ok : {success:true, data:[],message:'Data was sent successfully'},
        errorProducts: {success:'error', data: [], message: 'Products not found'},
        errorDetails: {success:'error', data: [], message: 'Product not found'},
        notFound: {success:'error', data: [], message: 'Params not found'}
    };

    productsView = async (res, products) => {
        res.send(this.getMessage(products) || this.messages.errorProducts);
    };

    productView = async (res, product) => {
        res.json(this.getMessage(product) || this.messages.errorDetails);
    };

    notFoundView = async (res) => {
        new NotFound(401, 'Params not found');
    }


    getMessage (product) {
        if (product.length == 0 || product == false) return false;
        this.messages.ok.data = product;
        return this.messages.ok;
    }
    
}



module.exports = new ProductsView();

