const Transaction = require("../models/Transaction");

const getSpendingByCategory = async (req, res) => {
    try {
        const userId = req.user.userId;

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

module.exports = {
    getSpendingByCategory
};