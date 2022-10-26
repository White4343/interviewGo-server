const jwt = require('jsonwebtoken')

const jwtTokens = ({user_id, lastname, mail, position, sub_id}) => {
    const user = {user_id, lastname, mail, position, sub_id}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: '30d'})
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, {expiresIn: '30d'})

    return (
        {
            accessToken, refreshToken
        }
    )
}

module.exports = jwtTokens