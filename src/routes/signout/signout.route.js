const { Router } = require("express");
const { httpPostSignout } = require("./signout.controller");

const router = Router();

router.post("/", httpPostSignout)


module.exports = router;