let getStudentPage = (req, res) => {
    return res.render("studentView.ejs", {
        errors: req.flash("errors"),
        user: req.user
    });
};

module.exports = {
    getStudentPage: getStudentPage,
};
