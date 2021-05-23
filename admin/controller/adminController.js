const adminModel = require('../model/adminModel')
const { md5 } = require('../utils/md5')
const { saveLog } = require('../utils/writeLog')

let logMsg = [
    "",
    "请登录后访问！"
]

module.exports = {
    // 管理员登录
    async adminLogin(req, res) {
        let { username, password } = req.body
        let data = await adminModel.getAdmin(username, md5(password))
        if (data.length > 0) {
            req.session['username'] = username // 存储session
            let time = await adminModel.getTime(username) // 获取上次登录时间
            req.session['usertime'] = time // 存储session
            await adminModel.setTime(username) // 记录登录时间
            saveLog(req) // 记录日志
            res.send({ url: '/index', code: 200 })
        } else {
            res.send({ url: "", code: -1, msg: "账号或密码错误请重新登录！" })
        }
    },
    // get
    indexLogin(req, res) {
        let msg = logMsg[req.query.type]
        res.render('login.html', { msg })
    },
}