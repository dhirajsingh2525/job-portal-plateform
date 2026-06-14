const express = require("express");

const router = express.Router();

const upload = require("../middleware/multer.middleware");

const { isLoggedIn, isRecruiter } = require("../middleware/auth.middleware");

const {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controller/job.controller");

router.get("/", getAllJobs);

router.get("/:id", getSingleJob);

router.post("/create", isLoggedIn, isRecruiter, upload.single("logo"), createJob);

router.patch("/:id", isLoggedIn, isRecruiter, upload.single("logo"), updateJob);

router.delete("/:id", isLoggedIn, isRecruiter, deleteJob);

module.exports = router;
