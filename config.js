const env = process.env;
const mysql = require('mysql');

//create database connection
const conn = mysql.createConnection({
    host: env.DB_HOST || 'freedb.tech',
    user: env.DB_USER || 'freedbtech_muhammadrifki',
    password: env.DB_PASSWORD || 'jupiter123',
    database: env.DB_NAME || 'freedbtech_book',
});

module.exports = conn;