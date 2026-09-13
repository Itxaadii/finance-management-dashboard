const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: [
                "bank",
                "credit_card",
                "investment",
                "cash",
                "other"
            ],
            required: true
        },

        institution: {
            type: String,
            trim: true
        },

        balance: {
            type: Number,
            default: 0
        },

        currency: {
            type: String,
            default: "INR"
        },

        plaidAccountId: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;