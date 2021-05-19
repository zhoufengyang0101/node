const cheerio = require("cheerio")
const http = require("http")
const path = require("path")
const fs = require("fs");
const os = require("os");

// const MAX_NUM = 3192;
const MAX_NUM = 2902;
const URL_ADD = "http://wufazhuce.com/one/";
const dirpath = path.join(__dirname, 'upload/images');
var $;
let list = { datalist: [] };
let jsonName = Date.now();
// 进行请求 输入下载数量
getUrl(30)

// 获取url
function getUrl(num) {
    if (num > 1000) num = 1000;
    let i = MAX_NUM - num--;
    let url = URL_ADD + i;
    console.log("正在请求：" + url);
    getElement(url)
    // 控制每秒进行一次
    if (num > 0) {
        setTimeout(() => {
            getUrl(num);
        }, 1000)
    } 
    return
}
// 获取元素
function getElement(url) {
    http.get(url, res => {
        let html = '';
        res.on('data', chunk => html += chunk);
        res.on('end', () => {
            $ = cheerio.load(html);
            let box = $("#main-container .one .tab-content");
            if (box) getData(box);
        })
    })
}

// 分解数据
function getData(box) {
    // text
    let text = box.find(".one-cita").text().trim();
    // img
    let img = box.find(".one-imagen img").attr("src");
    let name = path.basename(img) + ".jpg"
    if (!img) return; // 图片地址获取不到时  return
    uploadImg(img, name)
    // vol
    let vol = box.find(".one-titulo").text().trim();
    // 摄影
    let type = box.find(".one-imagen-leyenda").text().trim();
    // date
    let date = box.find(".one-pubdate .dom").text().trim() + " " + box.find(".one-pubdate .may").text().trim();

    let data = {
        "vol": vol,
        "date": date,
        "type": type,
        "img": name,
        "text": text,
    }
    save(data)
}

// 下载图片
function uploadImg(img, name) {
    http.get(img, res => {
        res.pipe(fs.createWriteStream(dirpath + '/' + name))
    })
}
// 保存数据文件
function save(data) {
    list.datalist.push(data)
    // 异步地追加数据到文件，如果文件尚不存在则创建文件
    let urlLog = './upload/log'+jsonName+'.json';
    let str = JSON.stringify(list)
    fs.writeFile(urlLog, str, 'utf-8', (err) => {
        if (err) throw err;
    })
}
