const msgHandler = require('../common/msgHandler');

class OrderView {
    sendOkMsg = async (res) => {
            msgHandler(res);
        }
};

module.exports = new OrderView();

