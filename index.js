const express = require("express");
const mongoose = require("mongoose");
const UsersRoute = require("./routes/user");
const todoRoute = require("./routes/todo");
const learnRoute = require("./routes/learn");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const cors = require("cors");

// connect mongoose to the application
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected"))
  .catch((error) => console.log(error));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// for users
app.use("/todo", UsersRoute);
app.use("/todo", todoRoute);
app.use("/learn", learnRoute);
//  for todo
app.listen(5000, () => {
  console.log("app is running");
});
