// imports
const mongoose = require("mongoose");

// schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
    },
    date: {
      type: Date,
    },
  },
  {
    collection: "tasks",
  }
);

// model export
