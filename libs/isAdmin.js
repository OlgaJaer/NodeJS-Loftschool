const isAdmin = (ctx, next) => {
  if (ctx.session.isAdmin) {
    return next();
  }
  ctx.redirect("./");
};

module.exports = isAdmin;
