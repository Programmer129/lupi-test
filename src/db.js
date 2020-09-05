const mysql = require('mysql2/promise');

// TODO change this
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'test123',
    database: 'lupi_test'
});

module.exports = pool;