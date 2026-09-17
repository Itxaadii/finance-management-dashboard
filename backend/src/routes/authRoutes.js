const express = require("express");

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const { validateRegister } = require("../middleware/validateAuth");

const router = express.Router();

router.post("/register", validateRegister, registerUser);

router.post("/login", loginUser);

module.exports = router;