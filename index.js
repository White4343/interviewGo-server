const routes = require('./routes/index');
require("dotenv").config();
const PORT = process.env.PORT || 8080
const express = require('express')
const app = express()

app.use(express.json())
app.use('/api', routes.subscriptionRouter)
app.use('/api', routes.userRouter)
app.use('/api', routes.subjectAreaRouter)
app.use('/api', routes.questionRouter)
app.use('/api', routes.interviewRouter)
app.use('/api', routes.interviewQuestionsControllerListRouter)
app.use('/api', routes.authRouter)

app.listen(PORT, () => console.log(`server port ${PORT}`))