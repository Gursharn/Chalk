import DBConnection from "./../configs/DBConnection";

let createCourse = (req, res) => {

  let course = {
    courseName: req.body.courseName,
    courseNumber: req.body.courseNumber,
    instructorName: req.body.instructorName,
    semester: req.body.semester,
    description: req.body.description,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    days: req.body.days,
    courseID: req.body.courseID
  }
  DBConnection.query(
    " INSERT INTO courses set ? ",
    course,
    function(err, results) {
      if (err) {
        throw err;
      }
      else console.log(results);
    }
  );

  res.redirect('/instructorHome');
};

let deleteCourse = (req, res) => {
  let courseID = req.query.courseID;

  var query = 'DELETE FROM courses WHERE courseID = ?';
  DBConnection.query(query, [courseID], (error, results, fields) => {
    if (error) throw error 
    else console.log(results);
  })

  res.redirect('/instructorHome');
};


let enrollCourse = (req, res) => {

  let addCourse = {
     courseID: req.body.courseID,
     courseNumber: req.body.courseNumber,
      courseName: req.body.courseName,
      email: req.body.email
  }
  DBConnection.query(
    " INSERT INTO enroll set ? ",
    addCourse,
    function(err, results) {
      if (err) {
        throw err;
      }
      else console.log(results);
    }
  );

  res.redirect('/studentView');
};



module.exports = {
  createCourse: createCourse,
  deleteCourse: deleteCourse,
  enrollCourse: enrollCourse,
};
