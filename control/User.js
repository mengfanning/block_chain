/**
 * 用户类
 */
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
  ctx.body = {
    status: 0,
    msg: '登录成功',
  }
}

// 注册参数验证
exports.checkRegisterParams = async (ctx, next) => {
  const { userName, passWord } = ctx.request.body;
  if (userName && passWord) {
    return next()
  } else {
    ctx.body = {
      status: -1,
      msg: '参数不完整',
    }
  }
}

// 注册
exports.register = async (ctx, next) => {
  const { userName, passWord } = ctx.request.body;
  const status = await UserMethods.findUser({ userName })
  if (status) {
    ctx.body = {
      status: -2,
      msg: '该用户已被注册'
    }
  } else {
    const status = await UserMethods.addUser({ userName, passWord })
    if (status) {
      ctx.body = {
        status: 0,
        msg: '注册成功'
      }
    }
  }
}
