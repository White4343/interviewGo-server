const Router = require('express')
const router = new Router()
const interviewController = require('../controller/interview.controller')
const authToken = require("../middleware/auth");
const checkAdmin = require("../utils/checkAdmin");

router.get('/interview', authToken, checkAdmin, interviewController.getInterviews)
router.get('/interview/:id', authToken, interviewController.getInterview)
router.get('/interview/test', authToken, interviewController.getTestInterviews)
router.get('/interview/results/:id', authToken, interviewController.getInterviewResults)
router.post('/interview', authToken, interviewController.createInterview)
router.put('/interview', authToken, checkAdmin, interviewController.updateInterview)
router.delete('/interview/:id', authToken, checkAdmin, interviewController.deleteInterview)

module.exports = router