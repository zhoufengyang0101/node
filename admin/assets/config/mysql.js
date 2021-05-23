let config;
if (process.env.NODE_ENV === 'dev') {
    // 开发环境
    config = {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'gp23',
        connectTimeout: 5000
    }
} else if (process.env.NODE_ENV === "test") {
    // 测试环境
    config = {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'gp23',
        connectTimeout: 5000
    }
} else if (process.env.NODE_ENV === "build") {
    // 上线环境
    config = {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'gp23',
        connectTimeout: 5000
    }
}

module.exports = config