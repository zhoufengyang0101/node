const router = require('express').Router()
const { saveLog } = require('../utils/writeLog')

const { loginCheck } = require('../middleware/loginMiddleware')

router.get('/', loginCheck, (req, res, next) => {
    // saveLog(req)
    res.render('index.html')
})
router.get('/index', loginCheck, (req, res, next) => {
    // saveLog(req)
    res.render('index.html')
})

module.exports = router