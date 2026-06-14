const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware/auth.middleware");

const {
  applyJob,
} = require("../controller/application.controller");

router.post(
  "/apply/:jobId",
  isLoggedIn,
  applyJob
);

module.exports = router;