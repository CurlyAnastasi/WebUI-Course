
class OrderView {
    sendOkMsg = async (res) => {
            res.send({status:'ok', data:[],message:'Data was sent successfully.'});
        }
};

module.exports = new OrderView();

