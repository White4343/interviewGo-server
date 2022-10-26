const Router = require('express')
const router = new Router()
const jwt = require('jsonwebtoken')
const db = require('../db')
const jwtToken = require('../utils/jwt-helpers')

router.post('/login', async (req, res) => {
    try {
        const {mail, password} = req.body
        const users = await db.query(`SELECT * FROM users WHERE mail = $1`, [mail])
        if (users.rows.length === 0)
            return res.status(401).json({
                massage: "Email isn't correct"
            })

        const validPassword = await db.query(`SELECT * FROM users WHERE password = $1`, [password])
        if (validPassword.rows.length === 0)
            return res.status(401).json({
                massage: "Password isn't correct"
            })

        let tokens = jwtToken(users.rows[0])
        res.cookie('refresh_token', tokens.refreshToken, {
            ...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}),
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })
        res.json(tokens)
    } catch (e) {
        res.status(401).json({
            message: e.message
        })
    }
})

router.get('/refresh_token', (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token
        if (refreshToken === null)
            return res.sendStatus(401)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (error, user) => {
            if (error)
                return res.status(403).json({
                    message: error.message
                })
            let tokens = jwtToken(user)
            res.cookie('refresh_token', tokens.refreshToken, {
                ...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}),
                httpOnly: true,
                sameSite: 'none',
                secure: true
            })
            return res.json(tokens)
        })
    } catch (e) {
        res.status(403).json({
            message: e.message
        })
    }
})

router.delete('/refresh_token', (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            message: "Refresh token deleted"
        })
    } catch (e) {
        res.status(401).json({
            message: e.message
        })
    }
})

module.exports = router