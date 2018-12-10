const router = require('koa-router')({ prefix: '/utils' })
const Utils = require('../control/Utils')

router.post('/getCaptcha', Utils.getCaptcha)

router.get('/getRsaPublic', Utils.getRsaPublic)

module.exports = router
