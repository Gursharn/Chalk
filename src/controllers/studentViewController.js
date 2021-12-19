let getStudentPage = (req, res) => {
    return res.render("studentView.ejs", {
        errors: req.flash("errors"),
        user: req.user
    });
};
// let getLogin = (req, res) => {
//     return res.render("login.ejs", {
//         errors: req.flash("errors"),
//         user: req.user
//     });
// };

let getInstructorPage = (req, res) => {
    return res.render("instructorHome.ejs", {
        errors: req.flash("errors"),
        user: req.user
    });
};
let adminPage = (req, res) => {
    return res.render("user-list.ejs", {
        errors: req.flash("errors"),
        user: req.user
    });
};
// let searchPage = (req, res) => {
//     return res.render("searchview.html", {
//         errors: req.flash("errors"),
//         user: req.user
//     });
// };

module.exports = {
    getStudentPage: getStudentPage,
    getInstructorPage: getInstructorPage,
    adminPage:adminPage,
    //searchPage:searchPage,
    //getLogin:getLogin
};
