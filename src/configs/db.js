require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "n7WMuGoxl9",
  password: "iNXYG2M1SQ",
  database: "n7WMuGoxl9"
});

connection.connect(err => {
  if (err) console.log(`Error: ${err}`);
});

module.exports = connection;
