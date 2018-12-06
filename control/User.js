/**
 * 用户
 */
module.exports = {
  login: async (ctx) => {
    const params = ctx.request.body;
    if (params && params.userName && params.passWord) {
      
    } else {
      ctx.body = {
        status: -1,
        msg: '参数不全',
      }
    }
  },
}
