// mongodb相关连接配置
let config;
if (process.env.NODE_ENV == 'dev') {
    // 开发环境
    config = {
        connect: 'mongodb://localhost:27017/test'
    }
} else {
    config = {
        connect: 'mongodb://localhost:27017/test'
    }
}

module.exports = config;