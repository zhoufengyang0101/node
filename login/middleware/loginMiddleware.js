const { saveLog } = require('../utils/writeLog')

const loginMiddleware = (req, res, next) => {

    let { username, password } = req.body
    if (username === "admin" && password === "admin") {
        next()
    } else {
        res.redirect('/login.html')
    }
}
const loginCheck = (req, res, next) => {

    if (req.session['username']) {
        saveLog(req)
        res.redirect('/index.html')
    } else {
        res.redirect('/login.html')
    }
}

module.exports = {
    loginMiddleware,
    loginCheck
}