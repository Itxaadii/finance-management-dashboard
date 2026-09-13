const express = require("express");
const { registerUser } = require("../controllers/authController");

console.log("registerUser type:", typeof registerUser);

const router = express.Router();

router.post("/register", registerUser);

module.exports = router;
