const plaidService = require("../services/plaidService");
const Account = require("../models/Account");
const Transaction = require("../models/Transaction");
const { categorizeTransaction } = require("../services/categoryService");

const createLinkToken = async (req, res) => {
    try {
        const response = await plaidService.createLinkToken();

        res.json({
            link_token: response.data.link_token
        });
    } catch (error) {
        console.error(
            "Plaid Link Token Error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Failed to create Plaid Link token",
            error: error.response?.data || error.message
        });
    }
};

const exchangeToken = async (req, res) => {
    try {
        const { public_token } = req.body;
        const userId = req.user.userId;

        if (!public_token) {
            return res.status(400).json({
                message: "public_token is required"
            });
        }

        const response = await plaidService.exchangePublicToken(public_token);

        const access_token = response.data.access_token;
        const item_id = response.data.item_id;

        const account = await Account.findOneAndUpdate(
            { user: userId },
            {
                plaidItemId: item_id,
                plaidAccessToken: access_token
            },
            { new: true }
        );

        if (!account) {
            return res.status(404).json({
                message: "No account found for this user"
            });
        }

        res.json({
            message: "Public token exchanged successfully",
            item_id: item_id
        });
    } catch (error) {
        console.error(
            "Plaid Token Exchange Error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Failed to exchange public token",
            error: error.response?.data || error.message
        });
    }
};

const createSandboxPublicToken = async (req, res) => {
    try {
        const response = await plaidService.createSandboxPublicToken();

        res.json({
            public_token: response.data.public_token
        });
    } catch (error) {
        console.error(
            "Sandbox Public Token Error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Failed to create Sandbox public token",
            error: error.response?.data || error.message
        });
    }
};

const getTransactions = async (req, res) => {
    try {
        const userId = req.user.userId;

        const account = await Account.findOne({
            user: userId,
            plaidAccessToken: { $ne: null }
        });

        if (!account) {
            return res.status(404).json({
                message: "No Plaid-connected account found"
            });
        }

        const response = await plaidService.syncTransactions(
            account.plaidAccessToken
        );

        const plaidTransactions = response.data.added;

        const transactionsToSave = plaidTransactions.map((transaction) => ({
            user: userId,
            account: account._id,
            amount: Math.abs(transaction.amount),
            type: transaction.amount < 0 ? "income" : "expense",
            category: categorizeTransaction(
                transaction.merchant_name,
                transaction.name
            ),
            description: transaction.name,
            transactionDate: new Date(transaction.date),
            merchant: transaction.merchant_name || transaction.name,
            currency: transaction.iso_currency_code || "USD",
            plaidTransactionId: transaction.transaction_id
        }));

        const existingTransactions = await Transaction.find({
            plaidTransactionId: {
                $in: transactionsToSave.map(
                    (transaction) => transaction.plaidTransactionId
                )
            }
        }).select("plaidTransactionId");

        const existingIds = new Set(
            existingTransactions.map(
                (transaction) => transaction.plaidTransactionId
            )
        );

        const newTransactions = transactionsToSave.filter(
            (transaction) => !existingIds.has(transaction.plaidTransactionId)
        );

        if (newTransactions.length > 0) {
            await Transaction.insertMany(newTransactions);
        }

        res.json({
            message: "Transactions fetched and saved successfully",
            count: newTransactions.length
        });
    } catch (error) {
        console.error(
            "Plaid Transactions Error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Failed to fetch and save transactions",
            error: error.response?.data || error.message
        });
    }
};

module.exports = {
    createLinkToken,
    exchangeToken,
    createSandboxPublicToken,
    getTransactions
};