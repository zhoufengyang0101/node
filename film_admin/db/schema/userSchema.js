const mongoose = require('../conn')
const md5 = require('md5')

// 定义Schema  集合的字段
const userSchema = new mongoose.Schema({
    // 手机号
    phone: {
        type: Number,
        // 自定义验证规则
        validate: {
            validator: function(value) {
                return /^1[3456789]\d{9}$/.test(value)
            },
            message: '请输入正确的手机号'
        }
    },
    // 邮箱
    email: {
        type: String,
        // 自定义验证规则
    },
    // 账号
    username: {
        type: String,
        minlength: 2,
        required: true,
        // 自定义验证规则
        validate: {
            validator: function(value) {
                return value != 'admin'
            },
            message: '用户名不能为admin'
        }
    },
    password: {
        type: String,
        // 修改器
        set: function(v) {
            return md5(v)
        }
    },
    age: {
        type: Number,
        // 获取器
        get: v => {
            if (v >= 10) {
                // return '保密'
                return v;
            }
            return v;
        }
    },
    sex: {
        type: String,
        enum: ['男神', '女神'],
        default: '男神'
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = userSchema;