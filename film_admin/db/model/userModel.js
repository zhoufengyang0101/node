const userSchema = require('../schema/userSchema')
const BaseModel = require('./baseModel')

class UserModel extends BaseModel {

    constructor() {
        // let model = mongoose.model('User', userSchema);
        // super(model)
        super('User', userSchema)
            // this.model = model;
    }

    // 查询账号和密码是否正确
    async checkUserLogin(username, password) {
        return await this.one({ username, password })
    }



}

module.exports = new UserModel;