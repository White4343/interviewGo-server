const jwt = require('jsonwebtoken')

const authToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (token == null)
        return res.status(401).json({
                message: "Null token"
            });

    jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
        if (error)
            return res.status(403).json({
                message: error.message
            });
        req.user = user;
        next();

        console.log(user)
    });
}

module.exports = authToken