const {ROLE} = require("./roles");

const checkAdmin = (req, res, next) => {
    try {
        const role = req.user.position

        if (role !== ROLE.ADMIN)
            return res.status(500).json({
                message: 'Access denied'
            })

        next()

    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports = checkAdmin