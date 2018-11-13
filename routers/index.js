const router = require('koa-router')({ prefix: '/user' })
const User = require('../control/User')
const Auth = require('../tools/authenticate')

router.get('/login', Auth, User.login)
router.post('/signin', User.signin)

module.exports = router