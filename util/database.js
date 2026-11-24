const path = require('node:path')
const mysql = require('mysql2')

if (process.env.DB_PASSWORD === undefined) {
    process.loadEnvFile(path.join(__dirname, '..', '.env'))
}

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: process.env.DB_PASSWORD
})

module.exports = pool.promise()
