const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')
const authToken = require("../middleware/auth");

router.post('/user', userController.createUser)
router.get('/user', authToken, userController.getUsers)
router.get('/user/:id', authToken, userController.getUser)
router.put('/user', authToken, userController.updateUser)
router.delete('/user/:id', authToken, userController.deleteUser)

module.exports = router