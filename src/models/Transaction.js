const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        type: {
            type: String,
            enum: [
                "income",
                "expense",
                "transfer"
            ],
            required: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        transactionDate: {
            type: Date,
            required: true,
            default: Date.now
        },

        merchant: {
            type: String,
            trim: true
        },

        currency: {
            type: String,
            default: "INR"
        },

        plaidTransactionId: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Transaction = mongoose.model(
    "Transaction",
    transactionSchema
);

module.exports = Transaction;