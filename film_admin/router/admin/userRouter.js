const router = require('express').Router()
const { index, add, store, pages, deleteOne, edit, edituser } = require('../../controller/admin/userController')

// 列表
router.get('/index', index);
// 分页数据
router.get('/pages', pages);
// 添加显示
router.get('/add', add);
// 添加处理
router.post('/add', store);
// 删除处理
router.delete('/delete', deleteOne);
// 修改显示
router.post('/edit', edit);
// 修改处理
router.post('/edituser', edituser)


module.exports = router;