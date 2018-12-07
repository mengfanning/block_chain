const ratelimit = require('koa-ratelimit'); 
const Redis = require('../redis')


// 登录请求限制
exports.userNameRatelimit = ratelimit({  
  db: Redis,
  duration: 60000,
  max: 10,
  id: function (ctx) {
    return ctx.request.body.userName;
  },
  errorMessage: { 
    status: -1,
    msg: '请求速度过快请稍后重试' 
  },
});