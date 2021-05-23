const router = require('express').Router()

const { deleteUser, deleteSelectUser, editUser, addUser, editOneUser } = require('../controller/userController')

// 单个删除用户
router.get('/delete/:id', deleteUser)

router.post('/delete/list', deleteSelectUser)

router.post('/edit', editUser)

router.post('/add', addUser)

router.post('/edituser', editOneUser)

module.exports = router