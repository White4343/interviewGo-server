const db = require("../db");

class SensorsController {
    async createSensor(req, res) {
        try {
            const {humidity, temperature, pulse} = req.body
            const newSencor = await db.query(`INSERT INTO sensors (temp, wet, pulse) values ($1, $2, $3) RETURNING *`,
                [humidity, temperature, pulse])
            console.log(humidity, temperature, pulse)
            res.json(newSencor.rows[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Can`t create sensor.'
            })
        }
    }
}

module.exports = new SensorsController()