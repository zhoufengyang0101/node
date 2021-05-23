const router = require('express').Router()


router.get('', (req, res) => {
    req.session['username'] = null;
    delete req.session['username']
    res.render('login.html', { msg: "请重新登录！" })
})


module.exports = router