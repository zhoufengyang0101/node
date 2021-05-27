const router = require('express').Router()

router.use('/', (req, res, next) => {
    console.log(req.url)
    next()
})
router.use('/admin', require('./loginRouter'));

// 需要验证的中间件
router.use(require('../../middleware/loginMiddleware'))


router.use('/admin/users', require('./userRouter'))
router.use('/admin/film', require('./filmRouter'))
router.use('/admin/chat', require('./chatRouter'))

router.use('/admin', require('./welcomeRouter'))

module.exports = router;