const { Router } = require("express");
const { httpGetSignup, httpPostSignup } = require("./signup.controller");

const multer = require("multer");

const router = Router();

router.get("/", httpGetSignup);

router.post("/", multer().none(), httpPostSignup)

module.exports = router;