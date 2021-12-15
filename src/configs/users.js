var express = require('express');
var router = express.Router();
const mySecret = process.env['DB_CONNECTION']
require('dotenv').config();
import mysql from "mysql2";
var db=require('./DBConnection');



router.get('/views/user-list', function(req, res, next) {
    var mysql2='SELECT * FROM students';
    db.query(mysql2, function (err, data, fields) {
    if (err) throw err;
    res.render('user-list', { title: 'User List', userData: data});
  });
});

module.exports = router;