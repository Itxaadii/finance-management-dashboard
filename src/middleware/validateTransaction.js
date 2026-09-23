const { body, validationResult } = require("express-validator");

const validateTransaction = [
    body("account")
        .notEmpty()
        .withMessage("Account is required"),

    body("amount")
        .isNumeric()
        .withMessage("Amount must be a number")
        .custom((value) => value >= 0)
        .withMessage("Amount cannot be negative"),

    body("type")
        .isIn(["income", "expense", "transfer"])
        .withMessage("Invalid transaction type"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),

    body("transactionDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid transaction date"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation failed",
                errors: errors.array()
            });
        }

        next();
    }
];

module.exports = { validateTransaction };