const router = require('koa-router')({ prefix: '/user' })
const User = require('../control/User')
const Utils = require('../control/Utils')
const Limiter = require('../tools/limiter')


router.post('/login', User.checkLoginParams, Limiter.userNameRatelimit, Utils.verifyCaptcha, User.login)
router.post('/register', User.checkRegisterParams, User.register)

module.exports = router
