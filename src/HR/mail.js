'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
function sendMail(){

    nodemailer.createTestAccount((err, account) => {
    
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,//465 Secure,//587
            secure: false, // true for 465, false for other ports
            auth: {
                user: "parag.kulkarni@opusconsulting.com", // generated ethereal user
                pass: "Opusbot@123"  // generated ethereal password
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Parag Kulkarni" <parag.kulkarni@opusconsulting.com>', // sender address
            to: 'kaustubh.mane@opusconsulting.com', // list of receivers
            subject: 'List of Updated Candidates', // Subject line
            text: 'Please check attachment for Encrypted Emails', // plain text body
            html: '<b>Please check attachment for Encrypted Emails</b>', // html body
            attachments : [
                {
                    path:'./updatedCandidates.xlsx'
                }
            ]
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
}

module.exports.sendMail = sendMail;