const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    logo: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    job_type: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    postedAt: {
      type: Date,
      default: Date.now,
    },

    skills: [
      {
        type: String,
      },
    ],

    education: {
      type: String,
    },

    experience: {
      type: String,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Job", jobSchema);
