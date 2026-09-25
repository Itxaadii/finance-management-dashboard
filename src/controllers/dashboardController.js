const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

const getSpendingByCategory = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const spending = await Transaction.aggregate([
            {
                $match: {
                    user: userId,
                    type: "expense"
                }
            },
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount"
                    }
                }
            },
            {
                $sort: {
                    total: -1
                }
            }
        ]);

        const result = spending.map((item) => ({
            category: item._id,
            total: item.total
        }));

        res.status(200).json(result);

    } catch (error) {
        console.error("Spending By Category Error:", error.message);

        res.status(500).json({
            message: "Failed to fetch spending by category"
        });
    }
};

const getIncomeVsExpense = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const summary = await Transaction.aggregate([
            {
                $match: {
                    user: userId,
                    type: {
                        $in: ["income", "expense"]
                    }
                }
            },
            {
                $group: {
                    _id: "$type",
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ]);

        let income = 0;
        let expense = 0;

        summary.forEach((item) => {
            if (item._id === "income") {
                income = item.total;
            }

            if (item._id === "expense") {
                expense = item.total;
            }
        });

        res.status(200).json({
            income,
            expense
        });

    } catch (error) {
        console.error("Income Vs Expense Error:", error.message);

        res.status(500).json({
            message: "Failed to fetch income and expense summary"
        });
    }
};

module.exports = {
    getSpendingByCategory,
    getIncomeVsExpense
};