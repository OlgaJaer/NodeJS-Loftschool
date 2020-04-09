const fs = require("fs");
const path = require("path");
const db = require("../models/db");
//const config = require("../config");
const validation = require("../libs/validation");

module.exports.get = async (ctx) => {
  if (ctx.session.isAdmin) {
    const data = {
      msgskill: ctx.flash("skills_info"),
      msgfile: ctx.flash("products_info"),
      skillsData: db.getArr("skills").value(),
    };
    await ctx.render("pages/admin", data);
  } else {
    ctx.redirect("/login");
  }
};

module.exports.postSkills = async (ctx) => {
  const { age, concerts, cities, years } = ctx.request.body;
  const errors = validation.skills({ age, concerts, cities, years });
  if (errors.length) {
    ctx.flash("skills_info", errors.join(". "));
    ctx.redirect("/admin");
  } else {
    let skillsArr = db.getArr("skills");
    skillsArr.find({ name: "age" }).assign({ number: age }).write();
    skillsArr.find({ name: "concerts" }).assign({ number: concerts }).write();
    skillsArr.find({ name: "cities" }).assign({ number: cities }).write();
    skillsArr.find({ name: "years" }).assign({ number: years }).write();
  
    ctx.flash("skills_info", "Навыки обновлены");
    await ctx.redirect("/admin");
  }
};

module.exports.postUpload = async (ctx) => {
  const { name: title, price } = ctx.request.body;
  const { name, size, path: filePath } = ctx.request.files.photo;
  const errors = validation.uploadFile({ name, size, title, price });

  if (errors.length) {
    fs.unlinkSync(filePath);
    ctx.flash("products_info", errors.join(". "));
    ctx.redirect("/admin");
  } else {
    const fileName = path.join(process.cwd(), "public", "upload", name);
    fs.rename(filePath, fileName, (err) => {
      if (err) {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        ctx.flash("products_info", "Возникла ошибка при обработке");
        ctx.redirect("/admin");
      } else {
        const dir = path.join("upload", name);
        let productsArr = db.getArr("products");
        productsArr.push({ src: dir, name: title, price }).write();

        ctx.flash("products_info", "Форма обработана");
        ctx.redirect("/admin");
      }
    });
  }
  await ctx.redirect("/admin");
};
