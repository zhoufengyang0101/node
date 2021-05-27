const mongoose = require('../conn')
class BaseModel {

    constructor(modelName, schema) {
        this.model = mongoose.model(modelName, schema);
    }

    async all(filter = {}, field = {}) {
        return await this.model.find(filter, field);
    }
    async count(filter = {}) {
        return await this.model.find(filter).countDocuments()
    }
    async page({ filter = {}, field = {}, start = 0, length = 10, sort = { updated_at: -1 } }) {

        return await this.model.find(filter, field).sort(sort).skip(+start).limit(+length)
    }
    async one(filter = {}) {
        return await this.model.findOne(filter)
    }
    async delete(filter = {}) {
        return await this.model.deleteOne(filter)
    }
    async update(filter = {}, field = {}) {
        return await this.model.updateOne(field, { $set: filter })
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