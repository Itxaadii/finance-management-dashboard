const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
    getSpendingByCategory
} = require("../controllers/dashboardController");

const router = express.Router();

router.get(
    "/spending-by-category",
    authMiddleware,
    getSpendingByCategory
);

module.exports = router;