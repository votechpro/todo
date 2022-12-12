const { Router } = require("express");
const { httpGetTodos, httpPostTodo, httpModifyTodo } = require("./todos.controller");
const multer = require("multer");

const router = Router();

router.post('/:id', httpModifyTodo);
router.get("/", httpGetTodos);
router.post("/", multer().none(), httpPostTodo);

module.exports = router