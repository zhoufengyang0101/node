const router = require('express').Router()
const path = require('path')
const multer = require('multer')
const { index, add, store, upfile, pages, delFilm, edit } = require('../../controller/admin/filmController')

const uploader = multer({
    // 存储 上传成功后，图片存储在服务器中的位置
    storage: multer.diskStorage({
        // 路径
        destination: function(req, file, cb) {
            cb(null, path.join(__dirname, '../../public/uploads'));
        },
        // 文件名
        filename: function(req, file, cb) {
            var changedName = (new Date().getTime()) + '-' + req.session['username'] + '-' + file.originalname;
            cb(null, changedName);
        }
    })
})

// 列表
router.get('/index', index);
// 添加影片显示
router.get('/add', add);
// 分页数据
router.get('/pages', pages);
// 添加影片处理
router.post('/upfile', uploader.single('file'), upfile)
router.post('/add', store)

// 删除影片
router.delete('/delete', delFilm)

// 编辑影片显示
router.post('/edit', edit)


module.exports = router;