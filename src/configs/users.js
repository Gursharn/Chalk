var express = require('express');
var router = express.Router();
//var db=require('../database');
require('dotenv').config();
import mysql from "mysql2";
const mySecret = process.env['DB_CONNECTION']
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/Admin.html', function(req, res, next) {
    var sql='SELECT * FROM students';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('students', { title: 'students List', userData: data});
  });
});

module.exports = router;