const mongoose = require("mongoose");
require("dotenv").config();

// Import Models
const User = require("../models/Users");
const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

const testModels = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");

        // Create User
        const user = await User.create({
            name: "Test User",
            email: "testuser@example.com",
            password: "testpassword123"
        });

        console.log("User created successfully");

        // Create Account
        const account = await Account.create({
            user: user._id,
            name: "Test Savings Account",
            type: "bank",
            institution: "Test Bank",
            balance: 10000,
            currency: "INR"
        });

        console.log("Account created successfully");

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

        console.log("Transaction created successfully");

        console.log("\nAll models tested successfully!");

        console.log("\nUser:");
        console.log(user);

        console.log("\nAccount:");
        console.log(account);

        console.log("\nTransaction:");
        console.log(transaction);

    } catch (error) {
        console.error("Model testing failed:", error.message);
    } finally {
        // Close MongoDB connection
        await mongoose.connection.close();
        console.log("\nMongoDB connection closed.");
    }
};

// Run the seeder
testModels();