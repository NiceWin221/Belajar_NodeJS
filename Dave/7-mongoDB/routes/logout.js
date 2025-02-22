const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logoutControllers");

router.get("/", logoutController.handleLogout);

module.exports = router;
