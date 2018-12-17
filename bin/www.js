const http = require('http')
const os = require('os')
const app = require('../app.js')

const service = http.createServer(app.callback())

service.listen(3000, () => {
  console.log(`please listen at http://${os.networkInterfaces().lo[0].address}:3000`)
})