const nodemailer = require('nodemailer')

module.exports = function (myoptions) {
  return new Promise((resolve, reject) => {
    nodemailer.createTestAccount((err, account) => {
      let transporter = nodemailer.createTransport({
        host: "smtp.163.com",
        secureConnection: true,
        port: 25, // port for secure SMTP
        auth: {
          user: "15137562600@163.com",
          pass: "abcd1234"
        }
      });
    
      let mailOptions = {
        from: '"验证码" <15137562600@163.com>', // sender address
        to: myoptions.target, // list of receivers
        subject: 'Hello1', // Subject line
        text: 'hello', // plain text body
        html: `<b>hello</b>` // html body
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error)
        }
        resolve(true)
      });
    });
  })
}

