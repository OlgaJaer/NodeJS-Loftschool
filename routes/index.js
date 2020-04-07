const path = require("path");
const Router = require("koa-router");
const router = new Router();
const koaBody = require("koa-body");
const validation = require("../libs/validation");
const formidable = require('formidable');

//app.use(koaBody());
const ctrlHome = require("../controllers/home");
const ctrlLogin = require("../controllers/login");
const ctrlAdmin = require("../controllers/admin");

router.get("/", ctrlHome.get);
router.post("/", ctrlHome.post);

router.get("/login", ctrlLogin.get);
router.post("/login", ctrlLogin.post);

router.get("/admin", ctrlAdmin.get);
router.post("/admin/skills", ctrlAdmin.postSkills);
router.post(
  "/admin/upload",
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: process.cwd() + "/public/upload",
    },
  }),
  ctrlAdmin.postUpload
);

module.exports = router;
