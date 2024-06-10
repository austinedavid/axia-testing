const express = require("express");
const {
  createUser,
  getAllUsers,
  loginUser,
  deleteUser,
  updateAccount,
} = require("../controllers/user");
const routes = express.Router();

// create new user route
routes.post("/register", createUser);
// get all users route
routes.get("/users", getAllUsers);
// login user
routes.post("/login", loginUser);
// delete a user
routes.delete("/user/delete", deleteUser);
// update account
routes.put("/user/update", updateAccount);

module.exports = routes;
