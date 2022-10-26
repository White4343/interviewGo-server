const Router = require('express')
const router = new Router()
const questionController = require('../controller/questions.controller')
const authToken = require("../middleware/auth");
const checkAdmin = require("../utils/checkAdmin");

router.get('/question', authToken, questionController.getQuestions)
router.get('/question/:id', authToken, questionController.getQuestion)
router.get('/question/test', authToken, questionController.getTestQuestions)
router.post('/question', authToken, checkAdmin, questionController.createQuestion)
router.put('/question', authToken, checkAdmin, questionController.updateQuestion)
router.delete('/question/:id', authToken, checkAdmin, questionController.deleteQuestion)

module.exports = router