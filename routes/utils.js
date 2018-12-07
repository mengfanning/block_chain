const router = require('koa-router')({ prefix: '/utils' })
const Utils = require('../control/Utils')

router.post('/getCaptcha', Utils.getCaptcha)

module.exports = router
