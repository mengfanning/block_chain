const svgCaptcha = require('svg-captcha')
const Redis = require('../redis')

// 获取验证码
exports.getCaptcha = async (ctx, next) => {
  const captcha = svgCaptcha.create();
  try {
    Redis.set(`cpt_${captcha.text}`, captcha.text, 'EX', 120) // Set redis
    ctx.body = {
      status: 0,
      captcha: captcha.data,
    }
  } catch (error) {
    ctx.body = {
      status: -1,
    }
  }
}

// 校验验证码
exports.verifyCaptcha = async (ctx, next) => {
  const captcha = ctx.request.body.captcha;
  const _checkStatus = await Redis.get(`cpt_${captcha}`)
  if (_checkStatus) {
    return  next()
  } else {
    ctx.body = {
      status: -1,
      msg: '二维码验证失败',
    }
  }
}
