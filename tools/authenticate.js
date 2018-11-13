// 身份认证

module.exports = async (ctx, next) => {
  const cookie = ctx.cookies.get('loginLog')
  if(cookie) {
    next()
  } else {
    ctx.status = 403
  }
}