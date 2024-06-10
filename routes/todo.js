const express = require("express");
const {
  createTodo,
  editTodo,
  getTodos,
  deleteTodo,
} = require("../controllers/todo");
const { verification, checkNumber } = require("../verify");
const routes = express.Router();

// create new todo route
routes.post("/newtodo", verification, createTodo);
// edit the todo
routes.put("/edit-todo", verification, editTodo);
// get todo route
routes.get("/get-todo", getTodos);
// delete todo route
routes.delete("/delete-todo", verification, deleteTodo);

module.exports = routes;
