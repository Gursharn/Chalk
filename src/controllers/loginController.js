import { validationResult } from "express-validator";
import loginService from "../services/loginService";

let getPageLogin = (req, res) => {
    return res.render("login.ejs", {
        errors: req.flash("errors")
    });
};
let getLoginInstructor = (req, res) => {
    return res.render("instructorLogin.ejs", {
        error: req.flash("errors")
    });
};
let checkLoginValid = async (req, res) => {
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/login");
    }

    try {
        await loginService.checkLoginValid(req.body.email, req.body.password);
        return res.redirect("/");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
};

let checkLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

let checkLogOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};

let postLogOut = (req, res) => {
    req.session.destroy(function(err) {
        return res.redirect("/login");
    });
};

let admin = (req, res) => {
    if(req.body.email === "adminInstructor@gmail.com" && req.body.password ==="123"){
      return res.redirect("/instructordb"); 
    }
};

let adminStudent = (req, res) => {
    if(req.body.email === "adminStudent@gmail.com" && req.body.password ==="123"){
      return res.redirect("/studentdb"); 
    }
};
let session = (req, res) => {
    var session;
    session=req.session;
    if(session.userid){
        res.redirect("/instructorHome")
    }else
    res.sendFile("/login");

};

// INSTRUCTOR NOW

let checkInstructorValid = async (req, res) => {
    let errorsArray = [];
    let validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        let error = Object.values(validationError.mapped());
        error.forEach((item) => {
            errorsArray.push(item.msg);
        });
        req.flash("errors", errorsArray);
        return res.redirect("/instructorLogin");
    }

    try {
        await loginService.checkInstructorValid(req.body.email, req.body.password);
        return res.redirect("/");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/instructorLogin");
    }
};

let checkInstructorLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/instructorLogin");
    }
    next();
};

let checkInstructorLogOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/instructorLogin");
    }
    next();
};

let instructorPostLogOut = (req, res) => {
    req.session.destroy(function(err) {
        return res.redirect("/instructorLogin");
    });
};





module.exports = {
    getPageLogin: getPageLogin,
    checkLoginValid: checkLoginValid,
    checkLogin: checkLogin,
    checkLogOut: checkLogOut,
    postLogOut: postLogOut,
    admin: admin,
    session: session,
    adminStudent: adminStudent,
    checkInstructorValid: checkInstructorValid,
    checkInstructorLogin: checkInstructorLogin,
    checkInstructorLogOut: checkInstructorLogOut,
    instructorPostLogOut: instructorPostLogOut,
    getLoginInstructor: getLoginInstructor
};
