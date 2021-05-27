const router = require('express').Router()
const { index,welcome,logout } = require('../../controller/admin/welcomeController')

// 后台首页
router.get('/index', index);
router.get('/welcome', welcome);
router.get('/logout', logout);



module.exports = router;