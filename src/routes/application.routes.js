const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware/auth.middleware");

const {
  applyJob,
  getRecruiterApplications,
  deleteApplication
} = require("../controller/application.controller");

router.post(
  "/apply/:jobId",
  isLoggedIn,
  applyJob
);
router.get(
  "/recruiter",
  isLoggedIn,
  getRecruiterApplications
);

router.delete("/:id", isLoggedIn, deleteApplication);

module.exports = router;