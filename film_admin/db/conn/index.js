// 连接mongodb数据库
const mongoose = require('mongoose')
// 连接配置
const { connect } = require('../../config/mongodb')
// mongodb://主机名:端口号/库名
mongoose.connect(connect, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose
