const joi = require('@hapi/joi');
const fs = require("fs");

module.exports.isValidEmail = (req,res, next) => {
  const schema = joi.object().keys({
    name: joi.string()
      .max(80)
      .required(),
    email: joi.string()
      .email()
      .required(),
    message: joi.string()
      .max(1200)
      .required()
  });

    const { error } = schema.validate(req.body);
  if (error) {
    const message = error.details.map(el => el.message).join("; ");
    res.status = 400;
    req.flash('info', 'Нужно заполнить все поля!');
  }
 
  next();
};

module.exports.isValidAuth = (req,res, next) => {
  const schema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    const message = error.details.map(el => el.message).join("; ");

    res.status = 400;
    
    return req.flash('info', 'Нужно заполнить все поля!');
  }
  res.redirect('/');
  next();
};

module.exports.skills = ({ age, concerts, cities, years }) => {
  const errors = [];

  if (age === '') {
    errors.push('Не указан возвраст');
  }

  if (concerts === '') {
    errors.push('Не указано число концертов');
  }

  if (cities === '') {
    errors.push('Не указано число городов');
  }

  if (years === '') {
    errors.push('Не указано количество лет на сцене');
  }

  return errors;
};

module.exports.uploadFile = ({ name, size, title, price }) => {
  const errors = [];

  if (name === '' || size === 0) {
    errors.push('Не загружена картинка');
  }

  if (title.trim() === '') {
    errors.push('Не указано название товара');
  }

  if (price === '') {
    errors.push('Не указана цена');
  }

  return errors;
};
