const { Router } = require("express");
const { httpGetHome, httpPostHome } = require("./home.controller");

const multer = require("multer");

const router = Router();

router.get("/", httpGetHome)

router.post("/", multer().none(), httpPostHome)

module.exports = router;