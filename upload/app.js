const http = require("http");
const url = require("url");
const fs = require("fs");
const os = require("os");
const qs = require("querystring");
const mimes = require("./libs/mime");
const { join, extname, basename } = require("path");

// 网站根目录
const webRoot = join(__dirname, 'www')

http.createServer((req, res) => {
    let { pathname, query } = url.parse(req.url, true)

    if (req.method === "POST") {
        if (pathname === "/upload") {
            let filename = Date.now() + extname(req.headers.filename);
            req.pipe(fs.createWriteStream(join(webRoot, "images", filename)));
            console.log("上传了文件：" + filename)
            res.end(JSON.stringify({ code: 200, url: "http://127.0.0.1:3000/images/" + filename }))
        } else if (pathname === "/close") {
            let filename = basename(req.headers.filename);
            try {
                fs.unlinkSync(join(webRoot, "images", filename));
                console.log("删除了文件：" + filename)
                res.end(JSON.stringify({ code: 200 }))
            } catch (err) {
                console.log("删除" + filename + "失败")
                res.end(JSON.stringify({ code: -1 }))
            }
        }
    } else {
        if (req.url !== "/favicon.ico") {
            pathname = pathname === '/' ? '/index.html' : pathname
            // 得到请求的对象服务器中真实的文件路径
            let filepath = join(webRoot, pathname)
            if (fs.existsSync(filepath)) {
                const ext = extname(filepath).slice(1)
                const mime = mimes[ext]
                res.setHeader('content-type', mime)
                let html;
                if ('html' === ext) {
                    html = fs.readFileSync(filepath, 'utf-8');
                    html = html.replace(/\{\{\s*(\w+)\s*\}\}/g, (preg, match) => {
                        return query[match]
                    })
                } else {
                    html = fs.readFileSync(filepath)
                }
                res.end(html)
                // fs.createReadStream(filepath).pipe(createGzip()).pipe(res)
            } else {
                res.statusCode = 404
                fs.createReadStream('./www/404.html').pipe(res)
            }
        }
    }
}).listen(3000, '0.0.0.0', () => {
    console.log("http://127.0.0.1:3000");
})