const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const db = require("../models/db");


module.exports.get = async (req,res) => {
  const skills = db.getSkills();
  const products = db.getProducts();

  await res.render("pages/index", {
    skills: skills,
    products: products,
    msgsemail: req.flash("info"),
  });
};

module.exports.post = async (req,res) => {
  const { name, email, message } = req.body;
  console.log(req.body)
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: process.env.EMAIL_BOX,
      from: email,
      subject: `Sending email from ${name}`,
      text: message,
    };
    sgMail.send(msg);
    req.flash("info", "Письмо успешно отправлено!");
    res.redirect("/#form");
  } catch (err) {
    req.flash("info", "Письмо не отправлено");
    if (err.res) {
      console.err(err.res.body);
    }
  }

  res.redirect("/");
};
