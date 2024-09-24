const express = require("express");
const {createTodo, updateTodo, getAllTodo, deleteTodo} = require("../controller/todoController");
const { jwtAuthMiddleware } = require("../middlewares/jwt");

const router = express.Router();

router.post("/", jwtAuthMiddleware,createTodo);

router.get("/", jwtAuthMiddleware, getAllTodo);

// router.get("/:id", jwtAuthMiddleware, getTodoById);

router.put("/:id", jwtAuthMiddleware, updateTodo);

router.delete("/:id", jwtAuthMiddleware, deleteTodo);

module.exports = router;
