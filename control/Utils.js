const svgCaptcha = require('svg-captcha')
const Redis = require('../redis')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const nodeMailer = require('../tools/nodemailer')

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
  const { captcha } = ctx.request.body;
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

// 发送邮箱验证啊
exports.sendMail = async (ctx, next) => {
  const { userName } = ctx.request.body;
  const reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$");
  if (!reg.test(userName)) {
    ctx.body = {
      status: -1,
      msg: '邮箱格式不正确'
    }
  } else {
    try {
      const code = crypto.randomBytes(4).toString('hex')
      const status = await nodeMailer({
        target: userName,
        text: code,
      }).catch((err) => {
        throw new Error(err)
      })
      if (status) {
        Redis.set(`ecode_${userName}`, code, 'EX', 300)
        ctx.body = {
          status: 0,
          msg: '发送成功'
        }
      }
    } catch (error) {
      ctx.body = {
        status: -2,
        msg: '发送失败'
      }
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
