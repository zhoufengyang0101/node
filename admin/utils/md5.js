const crypto = require('crypto')

function md5(str) {
    let md = crypto.createHash('md5')
    return md.update(str).digest('hex')
}

module.exports = {
    md5
}