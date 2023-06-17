const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/all", authMiddleware.authenticate, reportController.getAll);
router.post(
  "/register",
  authMiddleware.authenticate,
  reportController.registerReport
);

module.exports = router;
