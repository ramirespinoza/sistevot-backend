const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/all", authMiddleware.authenticate, roleController.getAll);

module.exports = router;
