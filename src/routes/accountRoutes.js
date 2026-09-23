const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
    getAccounts,
    getAccountById
} = require("../controllers/accountController");

const router = express.Router();

router.get("/", authMiddleware, getAccounts);

router.get("/:id", authMiddleware, getAccountById);

module.exports = router;
