import express from "express";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";

import studentViewController from "../controllers/studentViewController";
import instructorRegController from "../controllers/instructorRegController";
import auth from "../validation/authValidation";
import passport from "passport";
import initialPassportLocal from "../controllers/passportLocalController";
import initPassportLocal from "../controllers/passportLocalController";
import connection from "../configs/DBConnection";
import course from "../services/courseCreateService";
initialPassportLocal();
initPassportLocal();
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/studentView", studentViewController.getStudentPage);
  router.get("/", loginController.checkLogin, studentViewController.getStudentPage);
  router.get(
    "/login",
    loginController.checkLogOut,
    loginController.getPageLogin
  );
  router.get("/user-list", studentViewController.adminPage);
  //router.get("/login", studentViewController.getLogin);





  router.post(
    "/login",
    //loginController.adminStudent,
    passport.authenticate("local", {
      successRedirect: "/studentView", //successful login, redirect to student home page
      failureRedirect: "/login", // failes to login, redirect back to login again
      successFlash: true,
      failureFlash: true,
    })
  );

  router.get("/register", registerController.getPageRegister);
  router.post(
    "/register",
    auth.validateRegister,
    registerController.createNewUser
  );
  router.post("/logout", loginController.postLogOut);
  router.get("/instructorHome", studentViewController.getInstructorPage);

  router.get("/instructorHome", studentViewController.getInstructorPage);
  router.get(

    "/instructorLogin",
    loginController.getLoginInstructor,
    loginController.checkInstructorLogin,
    loginController.checkInstructorLogOut

  );
  router.post(
    "/instructorLogin",
    //loginController.admin,
    passport.authenticate("local", {
      successRedirect: "/instructorHome", //successful login, redirect to student home page
      failureRedirect: "/instructorLogin", // failes to login, redirect back to login again
      successFlash: true,
      failureFlash: true,
    })
  );

  router.get("/instructorRegister", instructorRegController.getInstructorReg);
  router.post(
    "/instructorRegister",
    auth.validateRegister,
    instructorRegController.createNewInstructor
  );

  router.post("/instructorLogout", loginController.instructorPostLogOut);

  app.post("/createCourse", course.createCourse);
  
  app.get("/deleteCourse", course.deleteCourse);

  function executeQuery(sql, cb){
    connection.query(sql, function(error, result, fields){
        if(error){throw err;}
        cb(result);
    });
}
function fetchData2(response){
    executeQuery("SELECT * FROM instructors", function(result){
        console.log(result);
        response.write('<table><tr>');
        for(var column in result [0]){
            response.write('<td><label>'+ column +'</label></td>');
            response.write('');
        }
        for(var row in result){
            response.write('<tr>');
            for(var column in result[row]){
                response.write('<td><label>'+ result[row][column] +'</label></td>');
            }
            response.write('</tr>');
        }
        response.write("<h1> </h1>");
        response.write("<a href = /login> Logout </a>");
        
        response.end('</table>');
        
    });
}
app.get('/instructorDB', function(request, response){
   
   //response.render("availableCourses.ejs");
   fetchData2(response);
   
});


function fetchData(response){
    executeQuery("SELECT * FROM courses", function(result){
        console.log(result);
        response.write('<table><tr>');
        for(var column in result [0]){
            response.write('<td><label>'+ column +'</label></td>');
            response.write('');
        }
        for(var row in result){
            response.write('<tr>');
            for(var column in result[row]){
                response.write('<td><label>'+ result[row][column] +'</label></td>');
            }
            response.write('</tr>');
        }
        response.write("<h1>Available Courses </h1>");
        response.write("<a href = /instructorHome> Home </a>");
        
        response.end('</table>');
        
    });
}
function fetchData3(response){
    executeQuery("SELECT * FROM courses", function(result){
        console.log(result);
        response.write('<table><tr>');
        for(var column in result [0]){
            response.write('<td><label>'+ column +'</label></td>');
            response.write('');
        }
        for(var row in result){
            response.write('<tr>');
            for(var column in result[row]){
                response.write('<td><label>'+ result[row][column] +'</label></td>');
            }
            response.write('</tr>');
        }
        response.write("<h1>Available Courses </h1>");
        response.write("<a href = /studentView> Home </a>");
        
        response.end('</table>');
        
    });
}
app.get('/availableCourses', function(request, response){
   
   //response.render("availableCourses.ejs");
   fetchData3(response);
   
});


app.get('/availableCourses', function(request, response){
   
   //response.render("availableCourses.ejs");
   fetchData(response);
   
});
  return app.use("/", router);
};
module.exports = initWebRoutes;
