
// const mysql = require('mysql2');
// require('dotenv').config();

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'saria',
//     password: '',
//     database: 'earbaj_db',
// });

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         return;
//     }
//     console.log('Connected to the MySQL database'); 
// })

// module.exports = connection;

require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Optional: test the connection and log
pool.getConnection((err, connection) => {
  if (err) {
    console.error('[DB ERROR]', err);
  } else {
    console.log('✅ MySQL DB Connected');
    connection.release();
  }
});

module.exports = db;
