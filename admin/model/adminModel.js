const query = require('../model/connection')
const { now } = require('../utils/writeLog')


module.exports = {
    // 管理员登录
    async getAdmin(name, pass) {
        const sql = `select * from user where username='${name}' && password='${pass}'`
        return await query(sql)
    },
    // 记录登录时间
    async setTime(username) {
        return await query(`update user set regdate = '${now()}' where (username = '${username}')`)
    },
    // 获取上次登录时间
    async getTime(username) {
        return await query(`select regdate from user where username='${username}'`)
    }

}