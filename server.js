const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const plaidRoutes =require("./routes/plaidRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/plaid",plaidRoutes);

// Basic test route
app.get("/", (req, res) => {
    res.send("PFM Dashboard Backend is running!");
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