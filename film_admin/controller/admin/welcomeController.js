module.exports = {
    index(req, res) {
        res.render('admin/index/index.html', {
            username: req.session['username'] || '未知'
        })
    },
    welcome(req, res) {
        res.render('admin/index/welcome.html')
    },
    logout(req, res) {
        req.session['username'] = null;
        delete req.session['username']
        res.redirect('/admin/login/index')
    }
}