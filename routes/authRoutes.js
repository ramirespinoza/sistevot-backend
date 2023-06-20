const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Register a new user
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

router.patch(
  "/updateTableName",
  authMiddleware.authenticate,
  authController.updateTableName
);

router.post("/logout", authController.logout);

module.exports = router;
