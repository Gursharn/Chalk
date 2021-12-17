const mySecret = process.env['DB_CONNECTION']
require('dotenv').config();
import mysql from "mysql2";

let connection = mysql.createPool({
    connectionLimit: 1000,
    host: "us-cdbr-east-04.cleardb.com",
    user: "b639341eea92bc",
    password: "7845fa861b0ac4d",
    database: "heroku_231b2a006cf47df",
        port:3306,

    //socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.query('SELECT * from students', (err, res) =>{
  //return console.log(res);
})


connection.getConnection(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});


module.exports = connection;
