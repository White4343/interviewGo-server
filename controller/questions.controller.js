const db = require('../db')

class QuestionsController {
    async createQuestion(req, res) {
        try {
            const {content, subj_id, sub_id, options, answer, isTest} = req.body
            const newQuestion = await db.query(`INSERT INTO questions (content, subj_id, sub_id, options, answer, isTest) values ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [content, subj_id, sub_id, options, answer, isTest])
            res.json(newQuestion.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t create question.'
            })
        }
    }

    async updateQuestion(req, res) {
        try {
            const {id, content, subj_id, sub_id, options, answer, isTest} = req.body
            const updQuestion = await db.query(`UPDATE questions SET content = $1, subj_id = $2, sub_id = $3, options = $4, answer = $5, isTest = $6 WHERE ques_id = $7 RETURNING *`,
                [content, subj_id, sub_id, options, answer, isTest, id])
            res.json(updQuestion.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t update question.'
            })
        }
    }

    async deleteQuestion(req, res) {
        try {
            const id = req.params.id
            const question = await db.query(`DELETE FROM questions WHERE ques_id = $1`, [id])
            res.json(question.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t delete question.'
            })
        }
    }

    async getQuestion(req, res) {
        try {
            const id = req.params.id
            const question = await db.query(`SELECT * FROM questions WHERE ques_id = $1 AND isTest != true`, [id])
            res.json(question.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get question.'
            })
        }
    }

    async getQuestions(req, res) {
        try {
            const question = await db.query(`SELECT * FROM questions`)
            res.json(question.rows)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get questions.'
            })
        }
    }

    async getTestQuestions(req, res) {
        try {
            const question = await db.query(`SELECT * FROM questions WHERE isTest = true`)
            res.json(question.rows)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get test questions.'
            })
        }
    }
}

module.exports = new QuestionsController()