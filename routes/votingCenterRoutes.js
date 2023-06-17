const express = require("express");
const router = express.Router();
const votingCenterController = require("../controllers/votingCenterController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/all", authMiddleware.authenticate, votingCenterController.getAll);

module.exports = router;
