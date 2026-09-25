const Budget = require("../models/Budget");

const createBudget = async (req, res) => {
    try {
        const userId = req.user.userId;

        const { category, monthlyLimit, month } = req.body;

        const budget = await Budget.create({
            user: userId,
            category,
            monthlyLimit,
            month
        });

        res.status(201).json({
            message: "Budget created successfully",
            budget
        });

    } catch (error) {
        console.error("Create Budget Error:", error.message);

        res.status(500).json({
            message: "Failed to create budget"
        });
    }
};

const getBudgets = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { month } = req.query;

        const filter = {
            user: userId
        };

        if (month) {
            filter.month = month;
        }

        const budgets = await Budget.find(filter)
            .sort({ category: 1 });

        res.status(200).json(budgets);

    } catch (error) {
        console.error("Get Budgets Error:", error.message);

        res.status(500).json({
            message: "Failed to fetch budgets"
        });
    }
};

const updateBudget = async (req, res) => {
    try {
        const userId = req.user.userId;

        const budget = await Budget.findOneAndUpdate(
            {
                _id: req.params.id,
                user: userId
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!budget) {
            return res.status(404).json({
                message: "Budget not found"
            });
        }

        res.status(200).json({
            message: "Budget updated successfully",
            budget
        });

    } catch (error) {
        console.error("Update Budget Error:", error.message);

        res.status(500).json({
            message: "Failed to update budget"
        });
    }
};

const deleteBudget = async (req, res) => {
    try {
        const userId = req.user.userId;

        const budget = await Budget.findOneAndDelete({
            _id: req.params.id,
            user: userId
        });

        if (!budget) {
            return res.status(404).json({
                message: "Budget not found"
            });
        }

        res.status(200).json({
            message: "Budget deleted successfully"
        });

    } catch (error) {
        console.error("Delete Budget Error:", error.message);

        res.status(500).json({
            message: "Failed to delete budget"
        });
    }
};

module.exports = {
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget
};