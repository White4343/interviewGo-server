const db = require('../db')

class UserController {
    async createUser(req, res) {
        try {
            const {mail, password} = req.body
            const newUser = await db.query(`INSERT INTO users (mail, password, position) 
            values ($1, $2, $3) RETURNING *`,
                [mail, password, 'USER'])
            res.json(newUser.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t create user.'
            })
        }
    }

    async getUsers(req, res) {
        try {
            const users = await db.query(`SELECT * FROM users`)
            res.json(users.rows)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get users.'
            })
        }
    }

    async getUser(req, res) {
        try {
            const mail = req.params.mail
            console.log(req.params)
            console.log(mail)
            const user = await db.query(`SELECT * FROM users WHERE mail = $1`, [mail])
            res.json(user.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get user.'
            })
        }
    }

    async updateUser(req, res) {
        try {
            const {id, mail, password, position} = req.body
            const updUser = await db.query(`UPDATE users SET mail = $1, password = $2, position = $7 WHERE user_id = $8 RETURNING *`, [mail, password, position, id])
            res.json(updUser.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t update user.'
            })
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id
            const user = await db.query(`DELETE FROM users WHERE user_id = $1`, [id])
            res.json(user.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t delete user.'
            })
        }
    }
}

module.exports = new UserController()