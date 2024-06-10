const todo = require("../models/todo");
const user = require("../models/user");

// create a new todo
const createTodo = async (req, res) => {
  console.log(req.user);
  console.log(req.myNumber);
  const { title, desc } = req.body;
  // check if user provided the neccessary info
  if (!title || !desc) {
    return res.json({ message: "all inputs are needed" }).status(404);
  }

  // now create the todo
  try {
    const newTodo = new todo({ creator: req.user.id, title, desc });
    const savedTodo = newTodo.save();
    res.json({ message: "todo created successfully" }).status(200);
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
};

// update the todo list
const editTodo = async (req, res) => {
  const { id, ...others } = req.body;
  const getTodo = await todo.findById(id);
  // check if is the owner
  if (getTodo.creator !== req.user.id) {
    return res.status(400).json({ message: "you can only update your todo" });
  }
  try {
    const editTodo = await todo.findByIdAndUpdate(
      id,
      { ...others },
      { new: true }
    );
    res.json(editTodo).status(200);
  } catch (error) {}
};

// get all the todos
const getTodos = async (req, res) => {
  try {
    const allTodo = await todo.find();
    res.json(allTodo);
  } catch (error) {
    console.log(error);
  }
};

// delete todo
const deleteTodo = async (req, res) => {
  const { id } = req.body;
  const getTodo = await todo.findById(id);
  // check the creator of the todo
  if (getTodo.creator !== req.user.id) {
    return res
      .json({ message: "you can only delete the todo you created" })
      .status(404);
  }
  try {
    await todo.findByIdAndDelete(id);
    res.json({ message: "the todo was deleted successfully" }).status(200);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createTodo, editTodo, getTodos, deleteTodo };
