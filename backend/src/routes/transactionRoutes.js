const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const { validateTransaction } = require("../middleware/validateTransaction");

const {
    getTransactions,
    createTransaction
} = require("../controllers/transactionController");

const router = express.Router();

router.get("/", authMiddleware, getTransactions);

router.post(
    "/",
    authMiddleware,
    validateTransaction,
    createTransaction
);

module.exports = router;