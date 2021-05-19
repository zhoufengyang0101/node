const http = require('http')
const fs = require('fs')
const url = require('url')

http.createServer((req, res) => {
  let { pathname, query } = url.parse(req.url, true)
  pathname = pathname === '/' ? '/jsonp.html' : pathname
  if (req.url != '/favicon.ico') {
    fs.createReadStream('./www/jsonp.html').pipe(res)
  }

}).listen(4000)