// 模型
const filmModel = require('../../db/model/filmModel');
const { edit } = require('./userController');
module.exports = {
    index(req, res) {
        res.render('admin/film/index.html')
    },
    add(req, res) {
        res.render('admin/film/add.html')
    },
    // 分页数据  ajax请求，返回json
    async pages(req, res) {
        // 排序所用
        let sortObj = { asc: 1, desc: -1 };
        let sort = {}

        // 分页数据，开始和取多少条记录
        let { start, length, draw, order, columns, search } = req.query;
        let { column, dir } = order[0]
        let fieldName = columns[column]['data']
        let orderType = sortObj[dir]
        sort[fieldName] = orderType
        let filter = {}
        if (search.value) {
            filter['username'] = new RegExp(search.value, 'iu');
        }

        let data = await filmModel.page({ start, length, sort, filter });
        let total = await filmModel.count()
            // 返回的响应json是有要求的
        let result = {
            draw,
            recordsTotal: total,
            recordsFiltered: total,
            data
        }
        res.send(result);
    },
    upfile(req, res) {
        // 回显给客户端的地址
        const filename = '/uploads/' + req.file.filename;
        res.send({
            code: 0,
            msg: 'ok',
            url: filename
        })
    },
    async store(req, res) {
        let postData = req.body;
        delete postData['file']
        let ret = await filmModel.store(postData)
        if (ret) {
            res.redirect('/admin/film/index')
        } else {
            res.redirect('/admin/film/add')
        }
    },
    async delFilm(req, res) {
        let { _id } = req.body
        let ret = await filmModel.delete({ _id: _id })
        if (ret.ok) {
            res.send({ code: 200 })
        } else {
            res.send({ code: 250 })
        }
    },
    // 编辑显示
    async edit(req, res) {
        let { _id } = req.body
        let data = await filmModel.one({ _id })
        console.log(_id, data);
        if (data) {
            res.render('admin/film/add.html', { data })
        } else {
            res.send({ err: -1 })
        }
    }
}