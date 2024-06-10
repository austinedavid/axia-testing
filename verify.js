const jwt = require("jsonwebtoken");

const verification = (req, res, next) => {
  const { todo_user } = req.cookies;
  if (!todo_user) return res.status(404).json({ message: "User not found" });
  jwt.verify(todo_user, process.env.JWT_SECRET_KEY, (error, payload) => {
    if (error) {
      res.status(400).json({ message: "error in verifying jwt" });
    } else {
      req.user = payload;
    }

    next();
  });
};

const checkNumber = (req, res, next) => {
  req.myNumber = 890;
  next();
};

module.exports = { checkNumber, verification };
