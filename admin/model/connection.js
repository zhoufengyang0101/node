const mysql = require('mysql')
const config = require('../assets/config/mysql')

const db = mysql.createConnection(config)
db.connect((err, res) => {
    !err ? console.log("connect database success...") : console.log("connect database failed...");
})

const query = sql => {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, res) => {
            !err ? resolve(res) : reject(err)
        })
    })
}

module.exports = query