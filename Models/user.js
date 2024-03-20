const mongoose = require("mongoose");

// schema
const useSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

// modal
const User = mongoose.model("user", useSchema);

module.exports = User;
