const Todo = require("../models/todoModle");

// Add a new todo
const createTodo = async (req, res) => {
  const { todo } = req.body;
  // console.log(req.user);
  try {
    const newTodo = new Todo({
      user: req.user.id,
      todo,
    });
    const saveTodo = await newTodo.save();
    res.status(201).json(saveTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all todo
const getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get  todo by id
// const getTodoById = async (req, res) => {
//   const todoId = req.params.id;
//   try {
//     const myTodo = await Todo.findById(todoId);
//     if (!myTodo) {
//       return res.status(404).json({ error: "Todo not found" });
//     }
//     res.status(200).json(myTodo);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// update todo
const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const updatedTodo = req.body;
    const response = await Todo.findByIdAndUpdate(todoId, updatedTodo, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete todo
const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const response = await Todo.findByIdAndDelete(todoId);
    if (!response) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createTodo,
  updateTodo,
  getAllTodo,
  deleteTodo,
};
