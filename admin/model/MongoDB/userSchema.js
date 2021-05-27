const mongoose = require('./connection')
const md5 = require('md5')

// 定义Schema集合字段
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        required: true,
        // 自定义校验规则
        validate: {
            validator: function(value) {
                return value !== "admin"
            },
            message: '用户名不能为admin'
        }
    },
    password: {
        type: String,
    },
    name: {
        type: String,
        default: "默认昵称",
    },
    sex: {
        type: String,
        enum: ['男', '女', '未知'],
        default: '未知'
    },
}, {
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'updata_at'
    }
})

module.exports = userSchema