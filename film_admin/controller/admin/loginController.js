// 数据库- 模型
const userModel = require('../../db/model/userModel')

module.exports = {
    index(req, res) {
        res.render('admin/login/index.html')
    },
    // ajax所用
    async login(req, res) {
        let { username, password } = req.body;
        if (username == '' || password == '') {
            // 不用继续了
            // return false;
            res.send({
                code: 1001,
                msg: '账号或密码为空',
                data: null
            })
            return;
        }

        // 进行数据库查询
        let userinfo = await userModel.checkUserLogin(username, password)
        if (!userinfo) {
            res.send({
                code: 1002,
                msg: '账号或密码错误',
                data: null
            })
            return;
        }

        // 登录成功
        // 写入session,保持登录状态
        req.session['username'] = username

        res.send({
            code: 0,
            msg: 'ok',
            data: userinfo
        })
    }
}