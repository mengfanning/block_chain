const UsersModel = require('../models/User')

module.exports = {
  // 查找用户
  findUser: (params) => {
    const { userName } = params;
    return UsersModel.findOne({ userName }, (err, docs) => {
      if (err) return false
      return docs
    })
  },
  // 添加用户
  addUser: (params) => {
    return new Promise((resolve, reject) => {
      const userModel = new UsersModel({ ...params, status: 1 }); // 默认状态为true
      userModel.save((err) => {
        if (err) {
          reject(false)
        } 
        resolve(true)
      })
    }) 
  },
}