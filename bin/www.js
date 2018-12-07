const http = require('http')
const app = require('../app.js')

const service = http.createServer(app.callback())

service.listen(3000, () => {
  console.log('please listen port at 3000')
})