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
const Connection = require("../configs/DBConnection");
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


  //find course
  router.post("/studentview.html", function(req, res){ Connection.find  });

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
   

  return app.use("/", router);
};
module.exports = initWebRoutes;
