const express = require("express");
const router = express.Router();

const ctrlHome = require("../controllers/home");
const ctrlLogin = require("../controllers/login");
const ctrlAdmin = require("../controllers/admin");
const validation = require('../libs/validation')

router.get("/", ctrlHome.get);
router.post("/", validation.isValidEmail, ctrlHome.post);

router.get("/login", ctrlLogin.get);
router.post("/login", ctrlLogin.post);

router.get("/admin", ctrlAdmin.get);
router.post("/admin/skills", ctrlAdmin.postSkills);
router.post("/admin/upload", ctrlAdmin.postUpload);

module.exports = router;
