const userSchema = require('./userSchema')
const BaseModel = require('./baseModel')

class UserModel extends BaseModel {
    constructor() {
        super("User", userSchema)
    }

    async checkUserLogin(username, password) {
        return await this.one({ username, password })
    }

    // 查找所有
    async getUsers() {
        return await this.all()
    }

    // 单个删除
    async deleteUser(id) {
        return await this.model.delOne({ '_id': id })
    }

    // 多个删除
    async deleteSelectUser(users) {
        return await this.model.delMany({ '_id': { $in: users } })
    }

    // 修改用户信息
    async editUser(key, value, id) {
        return await this.updateOne({ "_id": id }, { $set: { key: value } })
    }

    // 添加user
    async addUser(un, ps, nm, ss) {
        return await this.insertOne({ username: un, password: ps, name: nm, sex: ss })
    }

    // 验证user
    async findUser(un) {
        return await this.one({ 'username': un })
    }
    async editOneUser(un, ps, nm, ss, id) {
        return await this.updateOne({ '_id': id }, { $set: { username: un, password: ps, name: nm, sex: ss } })
    }
}

module.exports = new UserModel;