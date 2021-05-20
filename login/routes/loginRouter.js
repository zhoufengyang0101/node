const router = require('express').Router()
const { saveLog } = require('../utils/writeLog')

const { loginMiddleware } = require('../middleware/loginMiddleware')

router.post('', loginMiddleware, (req, res) => {
    req.session['username'] = req.body.username
    saveLog(req)
    res.redirect('/index.html')
})


module.exports = router