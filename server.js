const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import Models
const User = require("./models/Users");
const Account = require("./models/Account");
const Transaction = require("./models/Transaction");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
    res.send("PFM Dashboard Backend is running!");
});

// Model testing route
app.get("/test-models", async (req, res) => {
    try {
        // Create User
        const user = await User.create({
            name: "Test User",
            email: "testuser@example.com",
            password: "testpassword123"
        });

        // Create Account
        const account = await Account.create({
            user: user._id,
            name: "Test Savings Account",
            type: "bank",
            institution: "Test Bank",
            balance: 10000,
            currency: "INR"
        });

        // Create Transaction
        const transaction = await Transaction.create({
            user: user._id,
            account: account._id,
            amount: 500,
            type: "expense",
            category: "Food",
            description: "Test grocery purchase",
            merchant: "Test Store",
            currency: "INR"
        });

        res.json({
            message: "All models tested successfully",
            user: user,
            account: account,
            transaction: transaction
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Model testing failed",
            error: error.message
        });
    }
});

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });