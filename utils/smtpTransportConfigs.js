const nodemailer = require("nodemailer");

//TODO use Hostinger to send smtp messages

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service:"gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "dontwaitfir",
    pass: "yheyeryzkromdobo"
  },
});


module.exports = transporter;
