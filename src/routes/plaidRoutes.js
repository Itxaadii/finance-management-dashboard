const express = require("express");

const {
    createLinkToken,
    exchangeToken,
    createSandboxPublicToken,
    getTransactions
} = require("../controllers/plaidController");

const router = express.Router();

router.post("/create-link-token", createLinkToken);

router.post("/exchange-token", exchangeToken);

router.post("/sandbox-public-token", createSandboxPublicToken);

router.get("/transactions", getTransactions);

module.exports = router;