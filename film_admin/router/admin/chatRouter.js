const router = require('express').Router()

// 显示
router.get('/index', (req, res) => {
    res.render('admin/chat/index.html')
});


module.exports = router;