const http = require('http')
const url = require('url')

http.createServer((req, res) => {
  let { query: { cb } } = url.parse(req.url, true)

  if (cb !== 'kefu') {
    let user = JSON.stringify({
      id: 1,
      name: '张三'
    })

    res.end(`${cb}(${user})`)
  } else {
    let html = `\
      <ul>\
        <li>在线客服</li>\
        <li>联系商家</li>\
      </ul>\
    `
    res.end(`document.write('${html}')`)
  }

}).listen(3000)


