const express = require("express");
const router = express.Router();
const municipalityController = require("../controllers/municipalityController");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/all", authMiddleware.authenticate, municipalityController.getAll);

module.exports = router;
