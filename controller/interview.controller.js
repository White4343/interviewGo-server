const db = require("../db");
const {ROLE} = require("../utils/roles");

class InterviewController {
    async createInterview(req, res) {
        try {
            const {subj_id, length, user_id, date_time, contributor} = req.body
            const newInterview = await db.query(`INSERT INTO interview (subj_id, length, user_id, date_time, contributor) values 
                ($1, $2, $3, $4, $5) RETURNING *`, [subj_id, length, user_id, date_time, contributor])
            res.json(newInterview.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t create interview.'
            })
        }
    }

    async updateInterview(req, res) {
        try {
            const {id, subj_id, length, user_id, date_time, contributor} = req.body
            const updInterview = await db.query(`UPDATE interview SET subj_id = $1, length = $2, user_id = $3, date_time = $4, contributor = $5 
                WHERE interv_id = $6 RETURNING *`, [subj_id, length, user_id, date_time, contributor, id])
            res.json(updInterview.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t update interview.'
            })
        }
    }

    async deleteInterview(req, res) {
        try {
            const id = req.params.id
            const interview = await db.query(`DELETE FROM interview WHERE interv_id = $1`, [id])
            res.json(interview.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t delete interview.'
            })
        }
    }

    async getInterview(req, res) {
        try {
            const id = req.params.id
            const interview = await db.query(`SELECT * FROM interview WHERE interv_id = $1`, [id])
            // if (req.user.user_id !== interview.user_id){
            //     res.status(500).json({
            //         message: 'Can`t get interview.'
            //     })
            // } else if (req.user.position === ROLE.ADMIN){
            //     res.json(interview.rows[0])
            // }
            res.json(interview.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get interview.'
            })
        }
    }

    async getInterviewsByUser(req, res) {
        try {
            const id = req.params.id
            const interview = await db.query(`SELECT * FROM interview WHERE user_id = $1`, [id])
            // if (req.user.user_id !== interview.user_id){
            //     res.status(500).json({
            //         message: 'Can`t get interview.'
            //     })
            // } else if (req.user.position === ROLE.ADMIN){
            //     res.json(interview.rows[0])
            // }
            res.json(interview.rows)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get interview.'
            })
        }
    }

    async getInterviews(req, res) {
        try {
            const interview = await db.query(`SELECT * FROM interview`)
            res.json(interview.rows)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get interviews.'
            })
        }
    }

    async getTestInterviews(req, res) {
        try {
            const interview = await db.query(`SELECT interview.subj_id, interview.length, interview.user_id, interview.date_time FROM interview JOIN interview_questions ON interview.interv_id = interview_questions.interv_id JOIN questions ON interview_questions.ques_id = questions.ques_id WHERE questions.isTest != true`)
            res.json(interview.rows)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get test interview.'
            })
        }
    }

    async getInterviewResults(req, res) {
        try {
            const id = req.params.id
            const interview = await db.query(`SELECT * FROM interview_questions JOIN questions ON interview_questions.ques_id = questions.ques_id WHERE interview_questions.interv_id = $1`, [id])
            res.json(interview.rows)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get interview results.'
            })
        }
    }
}

module.exports = new InterviewController()