const router = require('koa-router')({ prefix: '/utils' })
const Utils = require('../control/Utils')
const Limiter = require('../tools/limiter')

router.post('/getCaptcha', Utils.getCaptcha)
router.post('/sendMail', Limiter.sendMailRatelimit, Utils.sendMail)
router.get('/getRsaPublic', Utils.getRsaPublic)

module.exports = router
