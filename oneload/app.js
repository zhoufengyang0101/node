const http = require("http");
const url = require("url");
const fs = require("fs");
const os = require("os");
const qs = require("querystring");
const crypto = require('crypto')
const { join, extname, basename } = require("path");

// 网站根目录
const webRoot = join(__dirname)

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

            let ext = extname(pathname)
            // 针对于图片进行浏览器缓存
            if ('.jpg' === ext) {
                // 强缓存
                res.setHeader('expires', new Date(Date.now() + 3600 * 1000).toGMTString());
                res.setHeader('cache-control', 'max-age=3600');

                // 协商缓存
                // http1.0 last-modified=>服务器发给浏览器   浏览器给服务器请求中发字段:if-modified-since
                let stat = fs.statSync(filepath)
                // 当前文件的修改时间
                let mtime = new Date(stat.mtime).toGMTString()
                // 发送给客户端
                res.setHeader('last-modified', mtime)
                // 如果客户端发过来的协商缓存时间如果和文件修改时间一致，则返回304
                if (mtime == req.headers['if-modified-since']) {
                    res.statusCode = 304;
                    return res.end()
                }
                // http1.1 etag 通过给文件md5，进行比对
                const cnt = fs.readFileSync(filepath)
                const hash = crypto.createHash('md5').update(cnt).digest('base64')
                res.setHeader('etag', hash)
                if (hash == req.headers['if-none-match']) {
                    res.statusCode = 304;
                    return res.end()
                }
            }
            fs.createReadStream(filepath).pipe(res)
        } else {
            res.statusCode = 404
            fs.createReadStream('./www/404.html').pipe(res)
        }
    }
}).listen(3000, '0.0.0.0', () => {
    console.log("http://127.0.0.1:3000");
})