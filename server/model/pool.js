const mysql = require('mysql2/promise');

const Pool = mysql.createPool({
  host: process.env.DB_TEST_HOST,
  user: process.env.DB_TEST_USER,
  password: process.env.DB_TEST_PASSWORD,
  database: process.env.DB_TEST_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+09:00',
  dateStrings: 'date',
});

export default Pool;
