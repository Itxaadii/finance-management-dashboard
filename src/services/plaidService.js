const plaidClient = require("../config/plaidClient");

const createLinkToken = async () => {
    return await plaidClient.linkTokenCreate({
        client_id: process.env.PLAID_CLIENT_ID,
        secret: process.env.PLAID_SECRET,
        user: {
            client_user_id: "test-user-123"
        },
        client_name: "PFM Dashboard",
        products: ["transactions"],
        country_codes: ["US"],
        language: "en"
    });
};

const exchangePublicToken = async (public_token) => {
    return await plaidClient.itemPublicTokenExchange({
        public_token
    });
};

const createSandboxPublicToken = async () => {
    return await plaidClient.sandboxPublicTokenCreate({
        institution_id: "ins_109508",
        initial_products: ["transactions"]
    });
};

const syncTransactions = async (access_token) => {
    return await plaidClient.transactionsSync({
        access_token
    });
};

module.exports = {
    createLinkToken,
    exchangePublicToken,
    createSandboxPublicToken,
    syncTransactions
};