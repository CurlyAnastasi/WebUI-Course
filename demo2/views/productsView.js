
class ProductsView {

    messages = {
        ok : {status:'ok', data:[],message:'Data was sent successfully'},
        errorProducts: {status:'error', data: [], message: 'Products not found'},
        errorDetails: {status:'error', data: [], message: 'Product not found'},
        notFound: {status:'error', data: [], message: 'Params not found'}
    };

    productsView = async (res,products) => {
        res.json(this.getMessage(products) || this.messages.errorProducts);
    };

    productView = async (res, product) => {
        res.json(this.getMessage(product) || this.messages.errorDetails);
    };

    notFoundView = async (res) => {
        res.json(this.messages.notFound);
    }


    getMessage (product) {
        if (product.length == 0 || product == false) return false;
        this.messages.ok.data = [product];
        return this.messages.ok;
    }
    
}



module.exports = new ProductsView();

