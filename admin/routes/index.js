const router = require('express').Router()

const { saveLogMiddleware } = require('../middleware/writeLogMiddleware')

// / 路由添加中间件记录访问日志
router.use('/', saveLogMiddleware, require('./homeRouter'))
router.use('/login', require('./loginRouter'))
router.use('/logout', require('./logoutRouter'))
router.use('/admin', require('./indexRouter'))
router.use('/user', require('./userRouter'))


// 404页面
router.use((req, res) => {
    res.status(404).render('404.html')
})
module.exports = router