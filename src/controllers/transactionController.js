const transactionService = require("../services/transactionService");

const getTransactions = async (req, res) => {
    try {
        const userId = req.user.userId;

        const transactions = await transactionService.getTransactionsByUser(
            userId
        );

        res.status(200).json({
            transactions
        });

    } catch (error) {
        console.error("Get Transactions Error:", error.message);

        res.status(500).json({
            message: "Failed to fetch transactions"
        });
    }
};

const createTransaction = async (req, res) => {
    try {
        const userId = req.user.userId;

        const transaction = await transactionService.createTransaction(
            userId,
            req.body
        );

        res.status(201).json({
            message: "Transaction created successfully",
            transaction
        });

    } catch (error) {
        console.error("Create Transaction Error:", error.message);

        res.status(500).json({
            message: "Failed to create transaction"
        });
    }
};

module.exports = {
    getTransactions,
    createTransaction
};