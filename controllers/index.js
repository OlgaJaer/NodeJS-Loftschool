const path = require("path");
const fs = require("fs");
const util = require("util");
require("dotenv").config();

module.exports.index = async ctx => {
  await ctx.render("pages/index");
};

module.exports.contacts = async ctx => {
  await ctx.render("pages/index");
};

module.exports.login = async ctx => {
  await ctx.render("pages/login");
};

module.exports.admin = async ctx => {
    await ctx.render("pages/admin");
  };