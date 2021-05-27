let config;
if (process.env.NODE_ENV === 'dev') {
    // 开发环境
    config = {
        connect: 'mongodb://localhost:27017/test'
    }
} else if (process.env.NODE_ENV === "test") {
    // 测试环境
    config = {
        connect: 'mongodb://localhost:27017/test'
    }
} else if (process.env.NODE_ENV === "build") {
    // 上线环境
    config = {
        connect: 'mongodb://localhost:27017/test'
    }
}

module.exports = config