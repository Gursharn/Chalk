import instructorRegService from "../services/instructorRegService";
import { validationResult } from "express-validator";

let getInstructorReg = (req, res) => {
  return res.render("instructorRegister.ejs", {
    errors: req.flash("errors"),
  });
};

let createNewInstructor = async (req, res) => {
  //validate required fields
  let errorsArr = [];
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((item) => {
      errorsArr.push(item.msg);
    });
    req.flash("errors", errorsArr);
    return res.redirect("/register");
  }

  //create a new user
  let newInstructor = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    await instructorRegService.createNewInstructor(newInstructor);
    return res.redirect("/login");   //successful redirect them to login
  } catch (err) {
    req.flash("errors", err);
    return res.redirect("/register");   // unsuccessful redirect them to register again
  }
};
module.exports = {
getInstructorReg: getInstructorReg,
createNewInstructor: createNewInstructor
};
