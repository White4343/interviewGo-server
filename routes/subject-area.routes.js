const Router = require('express')
const router = new Router()
const subjectAreaController = require('../controller/subject-area.controller')
const authToken = require("../middleware/auth");
const checkAdmin = require("../utils/checkAdmin");

router.get('/subject-area', authToken, subjectAreaController.getSubjectAreas)
router.get('/subject-area/:id', authToken, subjectAreaController.getSubjectArea)
router.get('/subject-area/interview/:id', authToken, subjectAreaController.getInterviewBySubjectArea)
router.get('/subject-area/question/:id', authToken, subjectAreaController.getQuestionsBySubjectArea)
router.post('/subject-area', authToken, checkAdmin, subjectAreaController.createSubjectArea)
router.put('/subject-area', authToken, checkAdmin, subjectAreaController.updateSubjectArea)
router.delete('/subject-area/:id', authToken, checkAdmin, subjectAreaController.deleteSubjectArea)

module.exports = router