const http = require("http");

const { saveLog } = require("./utils")

const serve = http.createServer();

serve.on("request", (req, res) => {
    // console.log(req.host)
    if(req.url === "/favicon.ico") return
    console.log("收到请求");
    saveLog(req)
    res.setHeader("Content-type", "application/json;charset=utf-8");
    res.end("hello")
})

serve.listen(3000, '0.0.0.0', () => {
    console.log("http://127.0.0.1:3000");
})