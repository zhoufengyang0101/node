const mongoose = require('../conn')
// 定义Schema  集合的字段
module.exports = new mongoose.Schema({
  title: String,
  pic: String,
  body: String
}, {
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at'
  }
})