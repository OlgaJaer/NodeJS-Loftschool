const joi = require('@hapi/joi');
const fs = require("fs");
const util = require("util");
const unlink = util.promisify(fs.unlink);

module.exports.isValidEmail = (ctx, next) => {
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

    const { error } = schema.validate(ctx.request.body);
  if (error) {
    const message = error.details.map(el => el.message).join("; ");

    ctx.status = 400;
    return (ctx.body = {
      mes: message,
      status: "Error"
    });
  }
  next();
};

module.exports.isValidAuth = (ctx, next) => {
  const schema = joi.object().keys({
    login: joi.string().required(),
    password: joi.string().required()
  });
  const { error } = schema.validate(ctx.request.body);
  if (error) {
    const message = error.details.map(el => el.message).join("; ");

    ctx.status = 400;
    return (ctx.body = {
      mes: message,
      status: "Error"
    });
  }
  console.log("Next auth");
  next();
};
