const mySecret = process.env['DB_CONNECTION']
const createError = require('http-errors');
const flash = require('express-flash');
require("dotenv").config();
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import connection from "./configs/DBConnection";

//import router from "./configs/users";
//var usersRouter = require('./configs/users');

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectFlash from "connect-flash";
import passport from "passport";
import path from "path";
let app = express();

//use cookie parser
app.use(cookieParser("secret"));


//config session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 86400000 1 day
    },
  })
);

// Enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/views")));

//app.use('/users', usersRouter);
app.get('/StudentDB', function(request, response){
    console.log('GET request received at DB') 
    connection.query("SELECT * FROM Students", function (err, result) {
        if (err) throw err;
        else{
            response.send(result)
        }

    });
});

// connection.query("SELECT `EMAIL` AND `PASSWORD` FROM `INSTRUCTORS` WHERE EMAIL = 'jason@gmail.com' and password = 'jason123'" );

app.get('/instructorDB', function(request, response){
    console.log('GET request received at DB') 
    connection.query("SELECT * FROM instructors", function (err, result) {
        if (err) throw err;
        else{
            response.send(result)
        }

    });
});

//Config view engine
configViewEngine(app);

//Enable flash message
app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

// init all web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`Building a login system with NodeJS is running on port ${port}!`)
);
