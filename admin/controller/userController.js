const adminModel = require('../model/adminModel')

const userModel = require('../model/userModel')
const { md5 } = require('../utils/md5')


// 统一响应函数
function _resResult(res, result) {
    if (result.affectedRows > 0) {
        res.send({ code: 200, msg: "success" })
    } else {
        res.send({ code: -1, msg: "failed" })
    }
}

module.exports = {
    // 获取users
    async getUsers(req, res) {
        let users = await userModel.getUsers();
        res.render('userList.html', { users })
    },
    // 删除单个用户
    async deleteUser(req, res) {
        let data = await userModel.deleteUser(req.params.id)
            // if (data.affectedRows > 0) res.send({ code: 200, msg: "success" })
            // else res.send({ code: -1, msg: "failed" })
        _resResult(res, data)
    },
    // 删除多个用户
    async deleteSelectUser(req, res, next) {
        let { users } = req.body
        let result = await userModel.deleteSelectUser(users);
        _resResult(res, result)
    },
    // 修改用户信息
    async editUser(req, res, next) {
        // 需要三个参数，修改的字段名  值  id
        let { key, value, id } = req.body
        let editRes = await userModel.editUser(key, value, id)
        _resResult(res, editRes)
    },
    async addUser(req, res, next) {
        let { un, ps, nm, ss } = req.body
        let findRes = await userModel.findUser(un)
        if (findRes.length > 0) {
            res.send({ code: -2, msg: '用户名已存在！' })
        } else {
            let addRes = await userModel.addUser(un, md5(ps), nm, ss)
            _resResult(res, addRes)
        }

    },
    async editOneUser(req, res, next) {
        let { un, ps, nm, ss, id } = req.body
        let findRes = await userModel.findUser(un)
        if (findRes.length > 0 && findRes[0].username !== un) {
            res.send({ code: -2, msg: '用户名已存在！' })
        } else {
            let addRes = await userModel.editOneUser(un, md5(ps), nm, ss, id)
            _resResult(res, addRes)
        }
    }


}