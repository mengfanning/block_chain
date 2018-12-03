const http = require('http')
const app = require('../app.js')
const fs = require('fs')
const path = require('path')

const service = http.createServer(app.callback())

service.listen(3000, () => {
  console.log('please listen port at 3000')
})