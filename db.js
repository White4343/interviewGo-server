const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "taras1968",
    host: "localhost",
    port: 5432,
    database: "interviewgodb"
})

module.exports = pool