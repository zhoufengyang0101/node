const router = require('express').Router()
const { index, login } = require('../../controller/admin/loginController')

// 登录显示
router.get('/login', index);
// 登录处理
router.post('/login', login)



module.exports = router;