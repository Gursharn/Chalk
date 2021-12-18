import DBConnection from "./../configs/DBConnection";
import bcrypt from "bcryptjs";

let createNewInstructor = (dataa) => {
  return new Promise(async (resolve, reject) => {
    // check email is exist or not
    let isEmailExist = await checkExistEmail(dataa.email);
    if (isEmailExist) {
      reject(
        `This email "${dataa.email}" has already exist. Please choose an other email`
      );
    } else {
      // hash password
      let salt = bcrypt.genSaltSync(10);
      
      let instructorItem = {
        firstName: dataa.firstName,
        lastName: dataa.lastName,
        email: dataa.email,
        password: bcrypt.hashSync(dataa.password, salt),
      };

      //create a new account
      DBConnection.query(
        " INSERT INTO instructors set ? ",
        instructorItem,
        function (err, rows) {
          if (err) {
            reject(false);
          }
          resolve("Create a new user successful");
        }
      );
    }
  });
};

let checkExistEmail = (email) => {
  return new Promise((resolve, reject) => {
    try {
      DBConnection.query(
        " SELECT * FROM `instructors` WHERE `email` = ?  ",
        email,
        function (err, rows) {
          if (err) {
            reject(err);
          }
          if (rows.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};


module.exports = {
    createNewInstructor: createNewInstructor,
};
