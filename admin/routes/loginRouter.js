const router = require('express').Router()
const { saveLog } = require('../utils/writeLog')

const { loginMiddleware } = require('../middleware/loginMiddleware')
const { adminLogin, indexLogin } = require('../controller/adminController')

// 登录  中间件记录日志
router.post('/', adminLogin)

// 
router.get('/', indexLogin)

module.exports = router