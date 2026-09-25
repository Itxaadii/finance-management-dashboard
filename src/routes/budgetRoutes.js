const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget
} = require("../controllers/budgetController");

const router = express.Router();

router.post("/", authMiddleware, createBudget);

router.get("/", authMiddleware, getBudgets);

router.put("/:id", authMiddleware, updateBudget);

router.delete("/:id", authMiddleware, deleteBudget);

module.exports = router;