const fs = require("fs");
const path = require("path");
const db = require("../models/db");
const config = require("../config");
const validation = require("../libs/validation");

module.exports.get = async ctx => {
  if (ctx.session.isAdmin) {
    const data = {
      msgskill: ctx.flash("skills_info"),
      msgfile: ctx.flash("products_info"),
      skillsData: db.getArr('skills').value(),
    };
    await ctx.render("pages/admin", data);
  } else {
    ctx.redirect("/login");
  }
};

module.exports.postSkills = async ctx => {
  const { age, concerts, cities, years } = ctx.request.body;
  const errors = validation.skills({ age, concerts, cities, years });
  if (errors.length) {
    ctx.flash("skills_info", errors.join(". "));
    ctx.redirect("/admin");
  } else {
    db.getArr('skills').push( { age, concerts, cities, years }).write();
    //db.saveSkills({ age, concerts, cities, years });
    ctx.flash("skills_info", "Навыки обновлены");
    await ctx.redirect("/admin");
  }
};

module.exports.postUpload = async ctx => {
  const { name: title, price } = ctx.request.body;
  const { name, size, path: filePath } = ctx.request.files.photo;
  const errors = validation.uploadFile({ name, size, title, price });
  if (errors.length) {
    fs.unlinkSync(filePath);
    ctx.flash("products_info", errors.join(". "));
    ctx.redirect("/admin");
  } else {
    const fileName = path.join(process.cwd(), "public", "upload", name);
    await fs.rename(filePath, fileName, err => {
      if (err) {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        ctx.flash("products_info", "Возникла ошибка при обработке");
      } else {
        const dir = path.join("upload", name);
        let productsArr = db.getArr("products");
        productsArr.push({ src: dir, name: title, price }).write();
        
        ctx.flash("products_info", "Форма обработана");
      }
    });
    ctx.redirect('/admin');
  }
};
