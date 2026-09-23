const categoryRules = {
    Food: [
        "swiggy",
        "zomato",
        "mcdonald",
        "dominos",
        "pizza",
        "restaurant",
        "cafe",
        "food"
    ],

    Transportation: [
        "uber",
        "ola",
        "rapido",
        "metro",
        "irctc",
        "petrol",
        "fuel"
    ],

    Shopping: [
        "amazon",
        "flipkart",
        "myntra",
        "ajio",
        "shopping",
        "mall"
    ],

    Entertainment: [
        "netflix",
        "spotify",
        "prime video",
        "youtube",
        "hotstar",
        "movie",
        "cinema"
    ],

    Bills: [
        "electricity",
        "water bill",
        "mobile bill",
        "phone bill",
        "internet",
        "recharge",
        "airtel",
        "jio",
        "vi"
    ],

    Healthcare: [
        "hospital",
        "pharmacy",
        "medical",
        "doctor",
        "apollo",
        "clinic"
    ],

    Education: [
        "udemy",
        "coursera",
        "college",
        "university",
        "course",
        "education"
    ]
};

const categorizeTransaction = (merchant, description) => {
    const text = `${merchant || ""} ${description || ""}`.toLowerCase();

    for (const [category, keywords] of Object.entries(categoryRules)) {
        if (keywords.some(keyword => text.includes(keyword))) {
            return category;
        }
    }

    return "Other";
};

module.exports = {
    categorizeTransaction
};