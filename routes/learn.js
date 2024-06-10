const express = require("express");
const routes = express.Router();
const jwt = require("jsonwebtoken");

routes.post("/jwt", (req, res) => {
  const details = { name: "david", email: "david@gmail.com", age: 27 };
  const token = jwt.sign(details, process.env.JWT_SECRET_KEY);
  res.cookie("jwt_token", token);
  res.json({ message: "jwt generated" });
});

routes.post("/verify", (req, res) => {
  const { jwt_token } = req.cookies;
  const verifiedToken = jwt.verify(
    jwt_token,
    process.env.JWT_SECRET_KEY,
    (error, payload) => {
      if (error) {
        res.json({ message: error.message });
      } else {
        res.json({ message: payload });
      }
    }
  );
});

module.exports = routes;
