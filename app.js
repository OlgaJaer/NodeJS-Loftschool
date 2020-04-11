const express = require("express");
const session = require("express-session");
const fs = require("fs");
const flash = require("connect-flash");
const config = require("./config");
const errorHandler = require("./libs/error");
const app = express();

const expiryDate = new Date(Date.now() + 60 * 60 * 1000);

// view engine setup
app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());

app.use(
  session({
    secret: "process.env.SESSION_SECRET_KEY",
    key: "sessionkey",
    cookie: { magAge: 86400000, expires: expiryDate },
    saveUninitalized: false,
    resave: false,
  })
);

app.use("/", require("./routes/index"));

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  if (!fs.existsSync(config.upload)) {
    fs.mkdirSync(config.upload);
  }
  console.log("Server start on port: ", port);
});
