const svgCaptcha = require('svg-captcha')
const Redis = require('../redis')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const rsa_public = fs.readFileSync(path.join(__dirname, '../rsa_public_key.pem'))

// 获取验证码
exports.getCaptcha = async (ctx, next) => {
  const captcha = svgCaptcha.create();
  const captchaKey = crypto.randomBytes(8).toString('hex')
  try {
    Redis.set(`cpt_${captchaKey}`, captcha.text, 'EX', 120) // Set redis
    ctx.cookies.set('captchaKey', captchaKey);
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
  const captchaKey = ctx.cookies.get('captchaKey')
  const _checkStatus = await Redis.get(`cpt_${captchaKey}`)
  if (_checkStatus) {
    if (captcha === _checkStatus) {
      return next();
    } else {
      ctx.body = {
        status: -4,
        msg: '验证码不正确'
      }
    }
  } else {
    ctx.body = {
      status: -3,
      msg: '验证码失效,请重新获取',
    }
  }
}

// 获取公钥
exports.getRsaPublic = async (ctx, next) => {
  ctx.body = {
    status: 0,
    publicKey: rsa_public.toString('utf8')
  }
}
