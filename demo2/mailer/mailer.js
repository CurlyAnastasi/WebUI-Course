const nodemailer = require("nodemailer");


class Mailer {
    main = async (user,products, orderID) => {
        const {name,phone,email } = user;
        let productsStr = '';
        let totalPrice = 0;
        for (let el of products) {
            productsStr += `
           <tr> 	
           <td>${orderID}</td>
           <td>${el.id}</td> 
           <td>${el.product_name}</td> 
           <td>${el.amount}</td>
           <td>${el.unit}</td> 
           <td>${el.price}</td> 
           <td>${el.amount * el.price}</td> 
           </tr>
           `;
            totalPrice += el.amount * el.price;
        }

        // `<b> Order_id:</b>${orderID}.<b> Product_id:</b>${el.id}.<b>Name:</b>${el.name}.<b> Amount:</b>${el.amount}.<b> Price:</b>${el.price}. <b>Price per item:</b>${el.amount * el.price}.`;
        // totalPrice += el.amount * el.price;
        let html = `
        <h1>A new order has been added to your store.</h1>
        <h3>Customer:</h3>
        <table cellspacing=”0” cellpadding=”0” width=”640” align=”center” border=”1”>     
        <tr> 	
        <th><b>Name:</b></th>
        <th><b>Phone:</b></th> 
        <th><b>Email:</b></th> 
        </tr>
        <tr> 	
        <td>${name}</td>
        <td>${phone}</td> 
        <td>${email ? email : '-'}</td> 
        </tr>
        </table>
        <h3> Order: </h3>
        <table cellspacing=”0” cellpadding=”0” width=”640” align=”center” border=”1”>
        <tr> 	
        <th><b>Order_id:</b></th>
        <th><b>Product_id:</b></th> 
        <th><b>Name:</b></th> 
        <th><b>Amount:</b></th>
        <th><b>Units:</b></th> 
        <th><b>Price:</b></th> 
        <th><b>Price per item:</b></th>
        </tr>
        ${productsStr}
        </table>
        <h3><b>Total price:</b> ${totalPrice}</h3>
        `

         // Generate test SMTP service account from ethereal.email
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, 
            auth: {
                user: testAccount.user, 
                pass: testAccount.pass, 
            },
        });

        // send mail with 
        let info = await transporter.sendMail({
            from: '"Curly Anastasi" <foo@example.com>', 
            to: "mailer.testacc@gmail.com",
            subject: "New order", 
            html: html, 
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
};

const mailer = new Mailer();

module.exports = mailer;