const query = require('../model/connection')
const { now } = require('../utils/writeLog')


module.exports = {
    // 管理员登录
    async getUsers() {
        const sql = `select * from user`
        return await query(sql)
    },
    // 单个删除
    async deleteUser(id) {
        const delSql = `delete from user where id=${id}`
        return await query(delSql)
    },
    // 多个删除
    async deleteSelectUser(users) {
        let str = ""
        if (typeof users === "array") {
            users.forEach(item => {
                str += item + ","
            });
            str = str.slice(0, -1)
        } else {
            str = users
        }
        const delSome = `delete from user where id in (${str})`
        console.log(delSome, "qweqeqw")
        return await query(delSome)
    },
    // 修改用户信息
    async editUser(key, value, id) {
        let editSql = `update user set ${key} = '${value}' where (id = '${id}')`
        return await query(editSql)
    },
    // 添加user
    async addUser(un, ps, nm, ss) {
        let addSql = `INSERT INTO user (username, password, regdate, logdate, num, name, sex) VALUES ('${un}', '${ps}', '${now()}', '1111', '1', '${nm}', '${ss}');`
        return await query(addSql)
    },
    // 验证user
    async findUser(un) {
        let addSql = `select * from user where username = '${un}'`
        return await query(addSql)
    },
    async editOneUser(un, ps, nm, ss, id) {
        let editSql = `update user set username = '${un}',password= '${ps}',name = '${nm}',sex = '${ss}' where (id = '${id}')`
        return await query(editSql)
    }
}