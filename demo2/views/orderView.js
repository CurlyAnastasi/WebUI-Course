
class OrderView {
    sendOkMsg = async (req,res) => {
            res.send({status:'ok', data:[],message:'Data was sent successfully.'});
        }
    sendError = async (req,res,type) => {
        let errorMsg = {status:'error', data:[],message:'Not found'};

        switch (type) {
            case 'user':
                errorMsg.message = 'user info is not valid';
            break;

            case 'products':
                errorMsg.message = 'Products are not found';
        }

        return res.send(errorMsg);
    }
};

module.exports = new OrderView();
