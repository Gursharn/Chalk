let getStudentPage = (req, res) => {
    return res.render("studentView.ejs", {
        errors: req.flash("errors"),
        user: req.user
    });
};

let getInstructorPage = (req, res) => {
    return res.render("instructorHome.ejs", {
        errors: req.flash("errors"),
        user: req.user
    });
};


module.exports = {
    getStudentPage: getStudentPage,
    getInstructorPage: getInstructorPage
};
