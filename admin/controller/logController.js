// log
const { lookLog } = require('../utils/writeLog')

module.exports = {
    getLog(req, res) {
        let data = lookLog()
            // let msg = { "今日访问次数": data.logNum, "今日访问ip数": data.ipNum }
        res.render('loginLog.html', { data })
    },
}