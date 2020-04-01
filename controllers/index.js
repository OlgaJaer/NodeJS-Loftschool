const path = require("path");
const fs = require("fs");
const util = require("util");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

module.exports.index = async ctx => {
  await ctx.render("pages/index");
};

module.exports.login = async ctx => {
  await ctx.render("pages/login");
};

module.exports.admin = async ctx => {
  await ctx.render("pages/admin");
};

module.exports.auth = async ctx => {
  const { login, password } = ctx.request.body;
  const user = db.getUser();
  if (user.login === login && psw.validPassword(password)) {
    ctx.session.isAuth = true;
    ctx.body = {
      mes: "Done",
      status: "OK"
    };
  } else {
    ctx.status = 403;
    ctx.body = {
      mes: "Forbiden",
      status: "Error"
    };
  }
};

module.exports.contact = async ctx => {
  const { name, email, message } = ctx.request.body;
  try {
    console.log(process.env.SENDGRID_API_KEY);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: "olgar.mamaeva@rambler.ru",
      from: email,
      subject: `Sending email from ${name}`,
      text: message
    };
    sgMail.send(msg);
  } catch (err) {
    return (ctx.body = {
      mes: err.message,
      status: "Error"
    });
  }
  ctx.body = {
    mes: "Done",
    status: "OK"
  };
  
  ctx.redirect('/');
};
