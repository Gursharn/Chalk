require('dotenv').config();
import mysql from "mysql2";

let connection = mysql.createPool({
    connectionLimit: 1000,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.getConnection(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});

module.exports = connection;
