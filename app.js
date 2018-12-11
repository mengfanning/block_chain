const program = require('commander');
const Koa = require('koa')
const app = new Koa()
const path = require('path')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const onError = require('koa-onerror')
const mongoose = require('mongoose')
const users = require('./routes/user')
const utils = require('./routes/utils')
const congfig = require('./config')

onError(app)

program
  .version('0.1.0')
  .option('-e, --emailpass [value]', 'email password')
  .parse(process.argv);
if (program.emailpassword) {
  global.emailpass = program.emailpass
} 

process.on('uncaughtException', function (err) {
	// logger.fatal('System error', { message: err.message, stack: err.stack });
	process.emit('cleanup');
});

app.use(logger((str, args)=> {
  console.log(str)
}))

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
mongoose.connect(congfig.mongodb,  { useNewUrlParser: true } )
const DB = mongoose.connection;
DB.on('error', (err) => {
  console.log(`mongodb Error =====> ${err}`)
  process.exit(1);
})
DB.once('open', (err) => {
  if (!err) { console.log('数据库连接成功!') }
})

app.use(users.routes(), users.allowedMethods())
app.use(utils.routes(), utils.allowedMethods())

module.exports = app;
