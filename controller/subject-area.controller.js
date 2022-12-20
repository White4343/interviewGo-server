const db = require('../db')

class SubjectAreaController {
    async createSubjectArea(req, res) {
        try {
            const {name, description} = req.body
            const newSubjArea = await db.query(`INSERT INTO subject_area (name, description) values ($1, $2) RETURNING *`,
                [name, description])
            res.json(newSubjArea.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t create subject area.'
            })
        }
    }

    async updateSubjectArea(req, res) {
        try {
            const {id, name, description} = req.body
            const updSubjArea = await db.query(`UPDATE subject_area SET name = $1 , description = $2 WHERE subj_id = $3 RETURNING *`,
                [name, description, id])
            res.json(updSubjArea.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t update subject area.'
            })
        }
    }

    async deleteSubjectArea(req, res) {
        try {
            const id = req.params.id
            const subjectArea = await db.query(`DELETE FROM subject_area WHERE subj_id = $1`, [id])
            res.json(subjectArea.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t delete subject area.'
            })
        }
    }

    async getSubjectArea(req, res) {
        try {
            const id = req.params.id
            const subjectArea = await db.query(`SELECT * FROM subject_area WHERE subj_id = $1`, [id])
            res.json(subjectArea.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get subject area.'
            })
        }
    }

    async getSubjectAreas(req, res) {
        try {
            const subjectArea = await db.query(`SELECT * FROM subject_area`)
            res.json(subjectArea.rows)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get subject areas.'
            })
        }
    }

    async getInterviewBySubjectArea(req, res) {
        try {
            const id = req.params.id
            const interviewSubjectArea = await db.query(`SELECT * FROM interview WHERE subj_id = $1`, [id])
            res.json(interviewSubjectArea.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get interviews by subject area.'
            })
        }
    }

    async getQuestionsBySubjectArea(req, res) {
        try {
            const id = req.params.id
            const interviewSubjectArea = await db.query(`SELECT * FROM questions WHERE subj_id = $1`, [id])
            res.json(interviewSubjectArea.rows)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get questions by subject area.'
            })
        }
    }
}

module.exports = new SubjectAreaController()