const routes = require('./routes/index');
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:8080',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
require("dotenv").config();
const PORT = process.env.PORT || 8080
const express = require('express')

const app = express()
app.use(express.json())
app.use(cors());

app.use('/api', routes.subscriptionRouter)
app.use('/api', routes.userRouter)
app.use('/api', routes.subjectAreaRouter)
app.use('/api', routes.questionRouter)
app.use('/api', routes.interviewRouter)
app.use('/api', routes.interviewQuestionsControllerListRouter)
app.use('/api', routes.authRouter)
app.use('/api', routes.sensorsRouter)


app.listen(PORT, () => console.log(`server port ${PORT}`))