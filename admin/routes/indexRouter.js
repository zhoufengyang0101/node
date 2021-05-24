const router = require('express').Router()
const { getLog } = require('../controller/logController')

const { getUsers } = require('../controller/userController')

// welcome
router.get('/index', (req, res, next) => {
    let time = req.session['usertime'][0].regdate
    let ip = req.socket.remoteAddress
    res.render('welcome.html', { ip, time })
})

// 获取日志
router.get('/loginLog', getLog)

// 获取userlist
router.get('/userList', getUsers)



module.exports = router