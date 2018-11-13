const fs = require('fs')


exports.login = async (ctx) => {
  ctx.body = '我是登录页面'
}

exports.signin = async (ctx) => {
  ctx.header = {
    ContentType: "application/octet-stream",
  }
  fs.createReadStream('../public/index.css').pipe(ctx.res)
}
