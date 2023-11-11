const express = require('express');
const router = express.Router();
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer');
const { HtmlTemplate } = require('./helpers/mailTemplate');

//server used to send emails.
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

// contactEmail.verify((error) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Ready to send");
//     }
// });

router.post("/contact", (req, res) => {
    //console.log(req);
    const name = req.body.firstName + ' ' + req.body.lastName;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone
    const mail = {
        from: name,
        to: 'nietojose1995@gmail.com',
        subject: 'Contact Form Submission - Portfolio',
        html: HtmlTemplate( name, email, phone, message ),
    };
    transporter.sendMail(mail, ( error ) =>{
      console.log('Error............');
      if ( error ) {

            console.log(error);
            res.status(500).json({
              ok: false,
              msg: 'Hable con el administrador' 
            });
            
        } else {
            console.log('Entra en code: 200');
            res.status(201).json({ ok: true, msg: "Email Sent" });
        }
    })

});

//  const sendMail = async (mailDetails, callback) => {
//     try {
//       const info = await transporter.sendMail(mailDetails);
      
//       callback(info);

//     } catch (error) {
//       console.log(error);
//     } 
//   };


  //module.exports = { sendMail }