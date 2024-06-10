const mongoose = require("mongoose");

// create todo schema
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// the todo model
const todoModel = mongoose.model("TODO", todoSchema);
module.exports = todoModel;
