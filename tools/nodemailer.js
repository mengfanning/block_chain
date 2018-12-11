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
          pass:"abcd17234",
        }
      });
      let mailOptions = {
        from: '"Fanning" <15137562600@163.com>', // sender address
        to: myoptions.target, // list of receivers
        subject: '授权', // Subject line
        text: myoptions.text, // plain text body
        html: `<b>您好,请妥善保存,有效期5分钟${myoptions.text}</b>` // html body
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

