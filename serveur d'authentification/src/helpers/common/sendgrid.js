

var nodemailer = require('nodemailer');
const Nexmo = require('nexmo');


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
const sendsms=function(num,code){
  const nexmo = new Nexmo({
    apiKey: '19745c21',
    apiSecret: 'UDiTcLMcHtR1L3P2'
   });
   
   nexmo.message.sendSms(
    'Tharwa Bank', num, 'Your code confiramtion is : '+code,
      (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          console.dir(responseData);
        }
      }
   );
};
module.exports =
{
  
  sendEmail,
  sendsms
};
