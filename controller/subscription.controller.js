const db = require('../db')

class SubscriptionController {
    async createSubscription(req, res) {
        try {
            const {tier, price, duration} = req.body
            const newSub = await db.query(`INSERT INTO subscriptions (tier, price, duration) values ($1, $2, $3) RETURNING *`,
                [tier, price, duration])
            res.json(newSub.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t create subscription.'
            })
        }
    }

    async updateSubscription(req, res) {
        try {
            const {id, tier, price, duration} = req.body
            const updSub = await db.query(`UPDATE subscriptions SET tier = $1, price = $2, duration = $3 WHERE sub_id = $4 RETURNING *`,
                [tier, price, duration, id])
            res.json(updSub.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t update subscription.'
            })
        }
    }

    async deleteSubscription(req, res) {
        try {
            const id = req.params.id
            const subscription = await db.query(`DELETE FROM subscriptions WHERE sub_id = $1`, [id])
            res.json(subscription.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t delete subscription.'
            })
        }
    }

    async getSubscription(req, res) {
        try {
            const id = req.params.id
            const subscription = await db.query(`SELECT * FROM subscriptions WHERE sub_id = $1`, [id])
            res.json(subscription.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get subscription.'
            })
        }
    }

    async getSubscriptions(req, res) {
        try {
            const subscriptions = await db.query('SELECT * FROM subscriptions')
            res.json(subscriptions.rows)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t get subscriptions.'
            })
        }
    }

    async updateUserSubscription(req, res) {
        try {
            const {id, sub_id} = req.body
            const updUserSub = await db.query(`UPDATE users SET sub_id = $1 WHERE user_id = $2 RETURNING *`, [sub_id, id])
            res.json(updUserSub.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t update user subscription. Please check id and sub_id on syntax error'
            })
        }
    }
}

module.exports = new SubscriptionController()