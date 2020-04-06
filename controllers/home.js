const path = require("path");
const fs = require("fs");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const db = require("../models/db");
const psw = require("../libs/password");

module.exports.get = async ctx => {
  await ctx.render("pages/index", { msgsemail: ctx.flash("info") });
};

module.exports.post = async ctx => {
  const { name, email, message } = ctx.request.body;

  if (!name || !email || !message) {
    ctx.flash("info", "Нужно заполнить все поля!");
    ctx.redirect("/");
  }
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: "olgar.mamaeva@rambler.ru",
      from: email,
      subject: `Sending email from ${name}`,
      text: message
    };
    sgMail.send(msg);
  } catch (err) {
    ctx.throw("Error", err.message);
    ctx.flash("info", "Нужно заполнить все поля!");
    await ctx.redirect("/");
  }
  ctx.flash("info", "Письмо успешно отправлено!");
  await ctx.redirect("/");
};
