const { saveLog } = require('../utils/writeLog')

const loginMiddleware = (req, res, next) => {

    let { username, password } = req.body
    if (username === "admin" && password === "admin") {
        next()
    } else {
        res.render('login.html')
    }
}
const loginCheck = (req, res, next) => {
    if (req.session['username']) {
        // saveLog(req)
        next()
    } else {
        res.redirect('login?type=1')
    }
}

module.exports = {
    loginMiddleware,
    loginCheck
}