const express = require('express')
const cookieSession = require('cookie-session')
const cors = require('cors')
const path = require('path')
const app = express()


// 跨域
app.use(cors())

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

// 使用模板引擎  指定解析的静态文件
app.engine("html", require('express-art-template'))

// 指定模板的路径
app.set('views', path.join(__dirname, 'www/views'))

// 使用路由
app.use(require('./routes'))


app.listen(3000, "0.0.0.0", () => {
    console.log("server start! http://localhost:3000")
})