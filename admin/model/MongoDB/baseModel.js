const mongoose = require('../connection')
const { now } = require('../../utils/writeLog')

class BaseModel {

    constructor(modelName, schema) {
        this.model = mongoose.model(modelName, schema)
    }

    async all(filter = {}, field = {}) {
        return await this.model.find(filter, field)
    }

    async one(filter = {}) {
        return await this.model.findOne(filter)
    }

    async setTm(username) {
        return await this.model.update({ 'username': username }, { $set: { 'regdate': now() } })
    }
    async getTm(username) {
        return await this.model.findOne({ 'username': username }, 'regdate')
    }

    // 删除
    async delOne(filter = {}) {
        return await this.model.deleteOne(filter)
    }
    async delMany(filter = {}) {
        return await this.model.deleteMany(filter)
    }

    // 更新
    async updateOne(filter = {}) {
        return await this.model.updateOne(filter = {})
    }

    // 插入
    async insertOne(filter = {}) {
        return await this.model.insertOne(filter = {})
    }

    /**
     * 添加文档信息
     * @param {object} doc 字典对象
     * @return 对象
     */
    async store(doc) {
        return await this.model.create(doc)
    }
}

module.exports = BaseModel