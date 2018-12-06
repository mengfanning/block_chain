const svgCaptcha = require('svg-captcha')
const crypto = require('crypto')
const Redis = require('../redis')

exports.getCaptcha = async (ctx, next) => {
  const captcha = svgCaptcha.create();
  try {
    // throw new Error
    const buf = crypto.randomBytes(8) // 产生随机key
    const captchaKey = `captcha_${buf.toString('hex')}` // 转换16进制字符串
    Redis.set(captchaKey, captcha.text, 'EX', 600) // Set redis
    ctx.cookies.set('captchaToken', captchaKey, {
      maxAge: 60 * 60 * 1000, // cookie有效时长
      overwrite: false,
    })
    ctx.body = {
      success: true,
      captcha: captcha.data
    }
  } catch (error) {
    ctx.body = {
      success: false,
    }
  }
}

exports.verifyCaptcha = async (ctx, next) => {
  const key = ctx.query.key;
  const value = ctx.query.value;
  const _value = await Redis.get(key)
  if (_value === value) {
    ctx.body = {
      status: 0,
      msg: '验证成功'
    }
  } else {
    ctx.body = {
      status: -1,
      msg: '验证失败',
    }
  }
}
