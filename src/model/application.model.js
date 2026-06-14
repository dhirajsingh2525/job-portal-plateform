const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    name: String,
    email: String,
    number: String,
    company: String,
    role: String,
    skills: String,
    education: String,
    resume: String,
    message: String,
    linkedin: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);