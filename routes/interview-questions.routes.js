const Router = require('express')
const router = new Router()
const interviewQuestionsListController = require('../controller/interview-questions.controller')
const authToken = require("../middleware/auth");
const checkAdmin = require("../utils/checkAdmin");

router.get('/interview-questions', authToken, interviewQuestionsListController.getInterviewQuestionsList)
router.get('/interview-question', authToken, interviewQuestionsListController.getInterviewQuestion)
router.post('/interview-questions', authToken, interviewQuestionsListController.createInterviewQuestionsList)
router.put('/interview-questions', authToken, interviewQuestionsListController.updateInterviewQuestionsList)
router.delete('/interview-questions/:id', authToken, checkAdmin, interviewQuestionsListController.deleteInterviewQuestionsList)

module.exports = router