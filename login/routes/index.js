const router = require('express').Router()

const { loginCheck } = require('../middleware/loginMiddleware')

router.use('/login', require('./loginRouter'))
router.use('/logout', require('./logoutRouter'))
router.use('/loginLog', require('./loginLogRouter'))

// 检查是否登录
router.use('/', loginCheck)

// 404页面
router.use((req, res) => {
    res.status(404).redirect('/404.html')
})
module.exports = router