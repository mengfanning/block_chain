const fs = require('fs')
const path = require('path')


exports.login = async (ctx) => {
  ctx.body = '我是登录页面'
}

exports.signin = async (ctx) => {
  ctx.set('Content-Type', "application/octet-stream")
  ctx.status = 200;
  fs.createReadStream(path.join(__dirname, '../public/index.txt')).pipe(ctx.res)
}
