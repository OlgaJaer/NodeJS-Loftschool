const db = require("../models/db");
const psw = require("../libs/password");

module.exports.get = async (req, res) => {
  if (req.session.isAdmin) {
    res.redirect("/admin");
  }
  await res.render("pages/login", { msglogin: req.flash("info") });
};

module.exports.post = async (req, res) => {
  const { email, password } = req.body;
  const user = db.getUser();
  if (user.email === email && psw.validPassword(password)) {
    req.session.isAdmin = true;
    res.redirect("/admin");
  } else {
    req.flash("info", "Неправильный логин или пароль");
    res.redirect("/login");
  }
};
