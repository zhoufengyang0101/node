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

// music
router.get('/musicList', (req, res, next) => {
    res.render('musicList.html')
})

// read
router.get('/readList', (req, res, next) => {
    res.render('readList.html')
})



module.exports = router