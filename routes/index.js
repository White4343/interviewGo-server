const subscriptionRouter = require('./subscription.routes')
const userRouter = require('./user.routes')
const subjectAreaRouter = require('./subject-area.routes')
const questionRouter = require('./question.routes')
const interviewRouter = require('./interview.routes')
const interviewQuestionsControllerListRouter = require('./interview-questions.routes')
const authRouter = require('./auth.routes')
const sensorsRouter = require('./sensors.routes')

const routes = {
    subscriptionRouter,
    userRouter,
    subjectAreaRouter,
    questionRouter,
    interviewRouter,
    interviewQuestionsControllerListRouter,
    authRouter,
    sensorsRouter
}

module.exports = routes