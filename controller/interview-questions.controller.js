const db = require("../db");

class InterviewQuestionsController {
    async createInterviewQuestionsList(req, res) {
        try {
            const {interv_id, ques_id, result, pulse, temp, wet, time} = req.body
            const newInterviewQuestionList = await db.query(`INSERT INTO interview_questions (interv_id, ques_id, result, pulse, temp, wet, time)
                values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [interv_id, ques_id, result, pulse, temp, wet, time])
            res.json(newInterviewQuestionList.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t create interview question list.'
            })
        }
    }

    async updateInterviewQuestionsList(req, res) {
        try {
            const {id, interv_id, ques_id, result, pulse, temp, wet, time} = req.body
            const updInterviewQuestionList = await db.query(`UPDATE interview_questions 
                SET interv_id = $1, ques_id = $2, result = $3, pulse = $4, temp = $5, wet = $6, time = $7 
                WHERE list_id = $8 RETURNING *`,
                [interv_id, ques_id, result, pulse, temp, wet, time, id])
            res.json(updInterviewQuestionList.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t update interview question list.'
            })
        }
    }

    async deleteInterviewQuestionsList(req, res) {
        try {
            const id = req.params.id
            const interviewQuestionList = await db.query(`DELETE FROM interview_questions WHERE list_id = $1`, [id])
            res.json(interviewQuestionList.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t delete interview question list.'
            })
        }
    }

    async getInterviewQuestionsList(req, res) {
        try {
            const interviewQuestionList = await db.query(`SELECT * FROM interview_questions`)
            res.json(interviewQuestionList.rows)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get interview question list.'
            })
        }
    }

    async getInterviewQuestion(req, res) {
        try {
            const {id, interv_id, ques_id} = req.body
            const interviewQuestionList = await db.query(`SELECT * FROM interview_questions WHERE list_id = $1 
                AND interv_id = $2 AND ques_id = $3`, [id, interv_id, ques_id])
            res.json(interviewQuestionList.rows)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t create interview question list.'
            })
        }
    }
}

module.exports = new InterviewQuestionsController()