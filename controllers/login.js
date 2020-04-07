const db = require("../models/db");
const psw = require("../libs/password");

module.exports.get = async ctx => {
  if (ctx.session.isAdmin) {
    ctx.redirect('/admin');
  }
  await ctx.render("pages/login", { msglogin: ctx.flash("info") });
};

module.exports.post = async ctx => {
  const { email, password } = ctx.request.body;
  const user = db.getUser();
  if (user.email === email && psw.validPassword(password)) {
    ctx.session.isAdmin = true;
   //console.log('LOGGED IN')
   ctx.redirect('/admin');
  } else {
    ctx.flash("info", "Неправильный логин или пароль");
    ctx.redirect("/login");
  }
};
