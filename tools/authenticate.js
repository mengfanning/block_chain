/**
 * 身份验证
 */
module.exports = async (ctx, next) => {
  const cookie = ctx.cookies.get('token')
  if(cookie) {
    next()
  } else {
    ctx.status = 403
  }
}