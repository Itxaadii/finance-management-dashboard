const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
    createLinkToken,
    exchangeToken,
    createSandboxPublicToken,
    getTransactions
} = require("../controllers/plaidController");

const router = express.Router();

router.post("/create-link-token", createLinkToken);

router.post("/exchange-token", authMiddleware, exchangeToken);

router.post("/sandbox-public-token", createSandboxPublicToken);

router.get("/transactions", authMiddleware, getTransactions);

module.exports = router;