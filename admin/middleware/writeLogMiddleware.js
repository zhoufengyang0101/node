const { saveLog } = require('../utils/writeLog')

const saveLogMiddleware = (req, res, next) => {
    saveLog(req)
    next()
}

module.exports = {
    saveLogMiddleware
}