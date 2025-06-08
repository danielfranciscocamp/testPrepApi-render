const mysql = require('mysql2');
require('dotenv').config();

const {DB_USER, DB_PASSWORD, DB_NAME, DB_HOST} = process.env

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db;


