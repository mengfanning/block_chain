
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  userName: String,
  passWord: String,
  status: Boolean,
})

module.exports = mongoose.model('Users', schema);
