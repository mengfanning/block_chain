const router = require('koa-router')()
const User = require('../control/User')
const Utils = require('../control/Utils')
// const Auth = require('../tools/authenticate')

router.post('/login', User.login)
router.post('/getCaptcha', Utils.getCaptcha)
router.get('/verifyCaptcha', Utils.verifyCaptcha)

module.exports = router
