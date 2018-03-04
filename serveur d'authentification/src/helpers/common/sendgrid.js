

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tharwa.ebank@gmail.com',
    pass: '@james-hetfield@'
  }
});
const sendEmail = function (to ,code){
var mailOptions = {
  from: 'amelias.azzi@gmail.com',
  to: to,
  subject: 'Code de Confirmation',
  html: '<b> Votre code de confirmation est : '+code+'</b>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
};
module.exports =
{
  
  sendEmail
};
