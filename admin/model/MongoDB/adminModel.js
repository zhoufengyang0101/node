const userSchema = require('./userSchema')
const BaseModel = require('./baseModel')

class UserModel extends BaseModel {
    constructor() {
        super("User", userSchema)
    }

    async checkUserLogin(username, password) {
        return await this.one({ username, password })
    }

    async getAdmin(username, password) {
        return await this.one({ username, password })
    }

    // 记录登录时间
    async setTime(username) {
            return await this.setTm(username)
        }
        // 获取上次登录时间
    async getTime(username) {
        return await this.getTm(username)
    }
}

module.exports = new UserModel;