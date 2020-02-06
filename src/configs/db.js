require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'remotemysql.com',
    user: process.env.DB_USER || 'n7WMuGoxl9',
    password: process.env.DB_PASS || 'iNXYG2M1SQ',
    database: process.env.DB_NAME || 'n7WMuGoxl9',
});

connection.connect((err) => {
    if (err) console.log(`Error: ${err}`);
});

module.exports = connection;