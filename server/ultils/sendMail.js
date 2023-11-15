require('dotenv').config();
const nodemailer = require("nodemailer");
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler(async ({ email, html }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"E-commerce" <no-reply@ecommerce.com>', // sender address
        to: email, // list of receivers
        subject: "Forget password", // Subject line
        html: html, // html body
    });
    return info;
})

module.exports = sendMail