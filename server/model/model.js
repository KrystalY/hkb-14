const mysql = require('mysql2/promise');

class Modal {
  static pool = mysql.createPool({
    host: DB_TEST_HOST,
    user: DB_TEST_USER,
    password: DB_TEST_PASSWORD,
    database: DB_TEST_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

module.exports = Model;
