const mysql = require('mysql');


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '123456',
    database: 'enigma'
})

module.exports = db;