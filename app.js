const Koa = require('koa')
const app = new Koa()
const path = require('path')
const bodyparser = require('koa-bodyparser')
const mongoose = require('mongoose')
const index = require('./routers/index')
const congfig = require('./config')

process.on('uncaughtException', function (err) {
	// logger.fatal('System error', { message: err.message, stack: err.stack });
	process.emit('cleanup');
});

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(require('koa-static')(path.join(__dirname, '/public')))

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start;
  console.log(`method: ${ctx.method} url: ${ctx.url} - ${ms}ms`)
})

// connect mongoDB
// mongoose.connect(congfig.mongodb)
// const DB = mongoose.connection;
// DB.on('error', (err) => {
//   console.log(`mongodb Error =====> ${err}`)
// })
// DB.once('open', (err) => {
//   if (!err) { console.log('数据库连接成功!') }
// })

app.use(index.routes(), index.allowedMethods())

module.exports = app;
