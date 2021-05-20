const router = require('express').Router()


router.get('', (req, res) => {
    req.session['username'] = null;
    delete req.session['username']
    res.redirect('/login.html')
})


module.exports = router