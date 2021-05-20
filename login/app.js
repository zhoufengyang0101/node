const express = require('express')
const cookieSession = require('cookie-session')
const app = express()

// 使用session
app.use(cookieSession({
    name: "sessionId",
    secret: "sajdooucbwekbfkgcgfiqweoribkcnzbzb,mbflksjhewo"
}))

// 网站根目录
app.use(express.static('www'))

// post接收
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(require('./routes'))


app.listen(3000, "0.0.0.0", () => {
    console.log("server start! http://localhost:3000")
})