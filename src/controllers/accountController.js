const Account = require("../models/Account");

const getAccounts = async (req, res) => {
    try {
        const userId = req.user.userId;

        const accounts = await Account.find({
            user: userId
        });

        res.status(200).json(accounts);
    } catch (error) {
        console.error("Get Accounts Error:", error.message);

        res.status(500).json({
            message: "Failed to fetch accounts"
        });
    }
};

const getAccountById = async (req, res) => {
    try {
        const userId = req.user.userId;
        const account = await Account.findOne({
            _id: req.params.id,
            user: userId
        });

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        res.status(200).json(account);
    } catch (error) {
        console.error("Get Account Error:", error.message);

        res.status(500).json({
            message: "Failed to fetch account"
        });
    }
};

module.exports = {
    getAccounts,
    getAccountById
};