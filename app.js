const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
//const static = require('koa-static');
const Pug = require("koa-pug");
const onerror = require("koa-onerror");
const fs = require("fs");
const path = require("path");

new Pug({
  viewPath: path.resolve(__dirname, "./views"),
  pretty: false,
  basedir: "./views",
  noCache: true,
  app: app
});

app.use(require("koa-static")("./public"));

onerror(app);

const router = require("./routes");
app.use(router.routes()).use(router.allowedMethods());


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server start on port: ", port);
});
