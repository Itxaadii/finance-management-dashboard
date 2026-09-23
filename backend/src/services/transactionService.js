const Transaction = require("../models/Transaction");

const getTransactionsByUser = async (userId) => {
    return await Transaction.find({ user: userId })
        .populate("account")
        .sort({ transactionDate: -1 });
};

const createTransaction = async (userId, transactionData) => {
    const transaction = new Transaction({
        user: userId,
        ...transactionData
    });

    return await transaction.save();
};

module.exports = {
    getTransactionsByUser,
    createTransaction
};