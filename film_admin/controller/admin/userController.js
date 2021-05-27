// 模型
const userModel = require('../../db/model/userModel')

module.exports = {

    // 列表
    index(req, res) {
        res.render('admin/user/index.html')
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

        let data = await userModel.page({ start, length, sort, filter });
        let total = await userModel.count()
            // 返回的响应json是有要求的
        let result = {
            draw,
            recordsTotal: total,
            recordsFiltered: total,
            data
        }
        res.send(result);
    },
    // 添加显示
    add(req, res) {
        // 初始化数据源
        let data = {
            username: '',
            password: '',
            confirm_password: '',
            phone: 18888888888,
            email: '1109108612@qq.com',
            sex: '男神',
            age: 10
        }
        if (req.session['adduser']) { // 之前有添加，但服务器端添加失败，重新添加
            Object.assign(data, req.session['adduser'])
                // data = { ...data, ...req.session['adduser'] }
        }
        res.render('admin/user/add.html', data)
    },
    // post接受
    async store(req, res) {
        // post数据接收
        let postData = req.body;
        // 添加数据之前先让session中存储数据
        req.session['adduser'] = postData;
        delete postData['confirm_password'];
        // 调用模型入库
        let ret = await userModel.store(postData)
        if (ret) {
            // 清空session中的数据
            req.session['adduser'] = null;
            delete req.session['adduser'];
            // 添加成功 返回到用户列表
            res.redirect('/admin/users/index')
        } else {
            res.redirect('/admin/users/add', { postData })
        }

    },
    async deleteOne(req, res) {
        let { _id } = req.body
        let ret = await userModel.delete({ _id })
        if (ret.ok) {
            res.send({ code: 200 })
        } else {
            res.send({ code: 250 })
        }
    },
    async edit(req, res) {
        let { _id } = req.body
        let data = await userModel.one({ _id })
        if (data) {
            res.render('admin/user/add.html', { data })
        } else {
            res.send({ err: -1 })
        }
    },
    async edituser(req, res) {
        // 根据id修改
        let { _id } = req.body;
        delete req.body._id
        let ress = await userModel.update(req.body, { '_id': _id })
        if (ress.ok) {
            res.redirect('/admin/users/index')
        } else {
            res.send({ code: 250 })
        }
    }

}