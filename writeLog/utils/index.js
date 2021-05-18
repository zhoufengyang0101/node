const fs = require("fs")
const os = require("os")

function now() {
    let dt = new Date()
    let y = dt.getFullYear()
    let m = (dt.getMonth() + 1 + '').padStart(2, '0')
    let d = dt.getDate()
    let h = dt.getHours()
    let min = dt.getMinutes()
    let s = dt.getSeconds()
    return `${y}-${m}-${d}-${h}-${min}-${s}`
}

function saveLog(req) {
    // 客户ip - 时间(年月日时分秒) - 请求的pathname - 
    // 请求体大小 - 请求类型(get/post) - 浏览器型号
    let header = req.headers;
    // 浏览器型号
    let agent = header['user-agent'];
    // 时间
    let date = now();
    // 请求类型
    let method = req.method;
    // ip
    let ip = req.socket.remoteAddress;
    // URL 对象
    const u = new URL(req.url, 'http:' + req.headers.host);
    // pathname
    let pathname = u.pathname;
    // 请求体大小
    let size = req.socket.bytesRead;

    let str = `${ip}-${date}-${pathname}-${size}-${method}-${agent}` + os.EOL

    // 拼接log路径名字
    let urlLog = './assets/log/' + date.slice(0, 10) + '.log';

    // 异步地追加数据到文件，如果文件尚不存在则创建文件
    fs.appendFile(urlLog, str, 'utf-8', (err) => {
        if (err) throw err;
        console.log("日志追加成功！");
        _lookLog(urlLog);
    })
}

function _lookLog(urlLog) {
    // 日志行数
    fs.readFile(urlLog, 'utf-8', (err, data) => {
        if (err) throw err;
        // 得到内容  计算行数
        let index = 0;
        let ipList = [];
        num = 0;
        while (index >= 0) {
            // 每行iP
            let dayIp = data.slice(index).split('-')[0].replace('\r\n', '');
            // 第一次出现  push到数组
            if(ipList.indexOf(dayIp) < 0 && dayIp.length >= 7) ipList.push(dayIp)
            num++;
            index = data.indexOf(os.EOL, index + 1);
        }
        console.log("今日记录日志" + num + "行!");
        console.log("今日访问ip共" + ipList.length +"个");
        console.log(ipList);

        // uv  独立访客 以cookie统计
    });
}


module.exports = {
    now,
    saveLog
}
