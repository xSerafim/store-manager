const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'trybe',
    password: 'Trybe123*',
    database: 'StoreManager',
    port: 3306 });

module.exports = connection;