const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const authController = require("../controller/auth.controller");

// Register
router.post("/register", authController.registerUser);

// Login
router.post("/login", authController.loginUser);

// Get All Users
router.get("/", authMiddleware.isLoggedIn, authController.getAllUsers);
router.get("/me", authMiddleware.isLoggedIn, authController.getMe)

// Update User
router.patch("/:id", authMiddleware.isLoggedIn, authController.updateUser);
router.post("/logout",  authController.logoutUser);

module.exports = router;
