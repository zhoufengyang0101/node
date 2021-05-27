const express = require('express')
const md5 = require('md5')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server);
server.listen(3000, '0.0.0.0')
app.use(express.static('www'))

const multer = require('multer')

const uploader = multer({
    // 存储 上传成功后，图片存储在服务器中的位置
    storage: multer.diskStorage({
        // 路径
        destination: function(req, file, cb) {
            cb(null, 'www/images');
        },
        // 文件名
        filename: function(req, file, cb) {
            var changedName = (new Date().getTime()) + '-' + file.originalname;
            cb(null, changedName);
        }
    })
})

app.post("/upfile", uploader.single('file'), (req, res) => {
    res.send({ url: '/images/' + req.file.filename })
})

// 在线人
let onlineUser = {}
let userList = []

// 监听socketio发过来的事件
io.on('connection', socket => {
    let uname = '未知'
    let img = ""
        // 接受用户名称
    socket.on('uname', nickname => {
        nickname = JSON.parse(nickname)
        uname = nickname.uname;
        img = nickname.img_url
            // 添加到在线队列中
        onlineUser[md5(uname)] = socket
        userList.push(nickname)
        sendUsers(userList)
    });


    // 接受聊天消息
    socket.on('msg', msg => {

        if (typeof msg === 'object') {
            msg = `<img src="${msg.url}" />`
        }
        let arr = msg.match(/^@(.+)\s+/)

        let str = `<p onclick="clickme('${uname}')"><img src="${img}" class="photo" />【${uname}】：</p><p class="msg">${msg}</p>`
            // @名称   认为是私聊
        if (!arr) {
            // 广播出去
            io.emit('msg', str)
        } else {
            msg = msg.replace(/^@(.+)\s+/, '')
                // 私聊
            socket.emit('msg', str)
            onlineUser[md5(arr[1])].emit('msg', str)
        }

        // 广播出去
        // io.emit('msg', `【${uname}】说：${msg}`)
        // 广播出去 除了不给自己发，给其他人发
        // socket.broadcast.emit('msg', `【${uname}】说：${msg}`)
    })

    socket.on('disconnect', () => {
        // 删除数组中的对应的一项
        userList.forEach((item, index) => {
            if (item.uname === uname) userList.splice(index, 1)
        })
        delete onlineUser[md5(uname)]
            // 除了不给自己发，给其他人发
        socket.broadcast.emit('msg', `<span style='color:red'>系统消息：【${uname}】默默退出了群聊</span>`)
        sendUsers(userList)
    })

    function sendUsers(list) {
        let elem = ""
        list.forEach(item => {
            elem += `<li><img src="${item.img_url}" /><span>${item.uname}</span></li>`
        });
        io.emit('users', elem)
    }
})