const Koa = require("koa");
const app = new Koa();
const session = require("koa-session");
const Pug = require("koa-pug");
const onerror = require("koa-onerror");
const fs = require("fs");
const path = require("path");
const errorHandler = require('./libs/error');
const config = require("./config");

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
app
  .use(session(config.session, app))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  if (!fs.existsSync(config.upload)) {
    fs.mkdirSync(config.upload);
  }
  console.log("Server start on port: ", port);
});
