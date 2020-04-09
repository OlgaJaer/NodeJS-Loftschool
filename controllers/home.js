const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const db = require("../models/db");


module.exports.get = async (ctx) => {
  const skills = db.getSkills();
  const products = db.getProducts();

  await ctx.render("pages/index", {
    skills: skills,
    products: products,
    msgsemail: ctx.flash("info"),
  });
};

module.exports.post = async (ctx) => {
  const { name, email, message } = ctx.request.body;

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: process.env.EMAIL_BOX,
      from: email,
      subject: `Sending email from ${name}`,
      text: message,
    };
    sgMail.send(msg);
    ctx.flash("info", "Письмо успешно отправлено!");
    ctx.redirect("/");
  } catch (err) {
    ctx.flash("info", "Письмо не отправлено");
    if (err.res) {
      console.err(err.res.body);
    }
  }

  ctx.redirect("/");
};
