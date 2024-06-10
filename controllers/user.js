// create new user
// login a user
// edit his profile
// delete his profile
const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// create a new user
const createUser = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .json({ message: "please enter all the information" })
      .status(400);
  }
  // lets encrypt the password
  const encryptedPassword = bcrypt.hashSync(password, 10);
  // check if the user already exists
  const findUser = await user.findOne({ email });
  if (findUser) return res.status(404).json({ message: "user already exists" });
  //   proceed to register the user
  try {
    const newUser = new user({ email, name, password: encryptedPassword });
    const savedUser = await newUser.save();
    res.json({ message: "user created successfully" }).status(201);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

// get all the user
const getAllUsers = async (req, res) => {
  try {
    const allUser = await user.find();
    res.json(allUser);
  } catch (error) {
    console.log(error);
  }
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "please enter your credentials" }).status(400);
  }
  // get the users details using the email
  const getUser = await user.findOne({ email });
  if (!getUser) {
    return res
      .json({ message: " you are not registered, please register" })
      .status(400);
  }
  // check if password matches
  const comparePassword = await bcrypt.compare(password, getUser.password);
  if (!comparePassword) {
    return res.status(400).json({ message: "password does not match" });
  }
  const { id, ...others } = getUser;
  // generate a token using jwt hashss
  const todo_user_token = jwt.sign(
    JSON.stringify({ id }),
    process.env.JWT_SECRET_KEY
  );

  //  store the user information in a cookie
  res.cookie("todo_user", todo_user_token);
  res.json({ message: "login successful" });
};

// delete an account
const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    await user.findByIdAndDelete(id);
    res.json({ message: "accout deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

// update an account
const updateAccount = async (req, res) => {
  const allInfo = req.body;
  const { id, ...others } = allInfo;
  try {
    await user.findByIdAndUpdate(id, { ...others }, { new: true });
    res.json({ message: "account updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  loginUser,
  deleteUser,
  updateAccount,
};
