const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const db = require("../models/db");
//const config = require("../config");
const validation = require("../libs/validation");

module.exports.get = async (req, res) => {
  if (req.session.isAdmin) {
    const data = {
      msgskill: req.flash("skills_info"),
      msgfile: req.flash("products_info"),
      skillsData: db.getArr("skills").value(),
    };
    await res.render("pages/admin", data);
  } else {
    res.redirect("/login");
  }
};

module.exports.postSkills = async (req, res) => {
  const { age, concerts, cities, years } = req.body;
  const errors = validation.skills({ age, concerts, cities, years });
  if (errors.length) {
    req.flash("skills_info", errors.join(". "));
    res.redirect("/admin");
  } else {
    let skillsArr = db.getArr("skills");
    skillsArr.find({ name: "age" }).assign({ number: age }).write();
    skillsArr.find({ name: "concerts" }).assign({ number: concerts }).write();
    skillsArr.find({ name: "cities" }).assign({ number: cities }).write();
    skillsArr.find({ name: "years" }).assign({ number: years }).write();

    req.flash("skills_info", "Навыки обновлены");
    await res.redirect("/admin");
  }
};


module.exports.postUpload = function (req, res) {
  const form = new formidable.IncomingForm();
  const upload = path.join("./public", "upload");

  form.uploadDir = path.join(process.cwd(), upload);

  form.parse(req, function (err, fields, files) {
    if (err) {
      if (fs.existsSync(files.photo.path)) {
        fs.unlinkSync(files.photo.path);
      }
      req.flash("products_info", "Возникла ошибка при обработке");
      res.redirect("/admin");
    }

    const { name: title, price } = fields;
    const { name, size } = files.photo;
    const errors = validation.uploadFile({ name, size, title, price });
    if (errors.length) {
      if (fs.existsSync(files.photo.path)) {
        fs.unlinkSync(files.photo.path);
      }
      req.flash("products_info", errors.join(". "));
      res.redirect("/admin");
    } else {
      const fileName = path.join(upload, files.photo.name);
      fs.renameSync(files.photo.path, fileName);
      const dir = fileName.replace('public', "");

      let productsArr = db.getArr("products");
      productsArr.push({ src: dir, name: title, price }).write();

      req.flash("form-info", "Форма обработана");
      res.redirect("/admin");
    }
  });
};
