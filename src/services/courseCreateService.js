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


module.exports = {
  createCourse: createCourse,
  deleteCourse: deleteCourse,
};
