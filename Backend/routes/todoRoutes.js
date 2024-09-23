const express = require("express");
const {createTodo, getTodoById, updateTodo, getAllTodo, deleteTodo} = require("../controller/todoController");

const router = express.Router();

router.post("/todos", createTodo);

router.get("/todos", getAllTodo);

router.get("/todos/:id", getTodoById);

router.put("/todos/:id", updateTodo);

router.delete("/todos/:id", deleteTodo);

module.exports = router;
