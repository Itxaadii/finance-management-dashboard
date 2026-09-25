const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
    getSpendingByCategory,
    getIncomeVsExpense
} = require("../controllers/dashboardController");

const router = express.Router();

router.get(
    "/spending-by-category",
    authMiddleware,
    getSpendingByCategory
);
router.get(
    "/income-vs-expense",
    authMiddleware,
    getIncomeVsExpense
);

module.exports = router;