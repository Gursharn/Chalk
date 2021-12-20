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

connection.query('SELECT * from courses', (err, res) =>{
  //return console.log(res);
})
//find course
// exports.search = (req,res) =>{
//   connection.getConnection((err, connection) => {
//     if(err) throw err;
//     console.log("connected to coursedb");

//     let searchterm = req.body.search;

//     connection.query('SELECT * from  courses WHERE courseName LIKE ?', ['%' + searchterm + '%'], (err, row) =>{
//         connection.release();
//         console.log(searchterm);
//         if(!err){
//           res.render('searchview', {row });
//         }else { 
//           console.log(err);
//         }
//         console.log("data from course db: \n", row);
//     });

    
//   });

// }


connection.getConnection(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});


module.exports = connection;
