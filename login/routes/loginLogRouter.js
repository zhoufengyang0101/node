const router = require('express').Router()
const { lookLog } = require('../utils/writeLog')

router.get('', (req, res) => {
    let data = lookLog()
    res.send({ "今日访问次数": data.logNum, "今日访问ip数": data.ipNum })

})

module.exports = router