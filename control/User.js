/**
 * 用户类
 */
// const fs = require('fs')
// const path = require('path')
// const crypto = require('crypto')
// const rsa_private = fs.readFileSync(path.join(__dirname, '../rsa_private_key.pem'))
const Redis = require('../redis')
const UserMethods = require('../dbHelpders/user')

// 登录参数校验
exports.checkLoginParams = async (ctx, next) => {
  const body = ctx.request.body
  if (body && body.userName && body.passWord && body.captcha) {
    return next()
  } else {
    ctx.body = {
      status: -1,
      msg: '参数不全',
    }
  }
}

// 登录
exports.login = async (ctx, next) => {
  const params = ctx.request.body;
  const { userName, passWord } = params;
  try {
    const userDocs = await UserMethods.findUser({ userName })
    if (userDocs) {
      // const result = crypto.privateDecrypt({ key: rsa_private, padding: crypto.constants.RSA_PKCS1_PADDING}, new Buffer(passWord, 'base64'))
      if (userDocs.passWord == passWord) {
        ctx.body = {
          status: 0,
          msg: '登录成功',
        }
      } else {
        ctx.body = {
          msg: '账号密码错误',
          status: -6
        }
      }
    } else {
      ctx.body = {
        msg: '用户不存在',
        status: -5
      }
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      error: error
    }
  }
}

// 注册参数验证
exports.checkRegisterParams = async (ctx, next) => {
  const { userName, passWord, eCode } = ctx.request.body;
  if (userName && passWord && eCode) {
    const reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$"); 
    if (!reg.test(userName)) {
      ctx.body = {
        status: -2,
        msg: '邮箱格式不正确'
      }
    } else {
      return next()
    }
  } else {
    ctx.body = {
      status: -1,
      msg: '参数不完整',
    }
  }
}

// 注册
exports.register = async (ctx, next) => {
  const { userName, passWord, eCode } = ctx.request.body;
  const status = await UserMethods.findUser({ userName })
  if (status) {
    ctx.body = {
      status: -3,
      msg: '该用户已被注册'
    }
  } else {
    const _risEcode = await Redis.get(`ecode_${userName}`)
    if (_risEcode) {
      if (_risEcode === eCode) {
        const status = await UserMethods.addUser({ userName, passWord })
        if (status) {
          ctx.body = {
            status: 0,
            msg: '注册成功'
          }
        } else {
          status.body = {
            status: -6,
            msg: '添加失败'
          }
        }
      } else {
        ctx.body = {
          status: -5,
          msg: '验证码不正确'
        }
      }
    } else {
      ctx.body = {
        status: -4,
        msg: '验证码失效'
      }
    }
  }
}