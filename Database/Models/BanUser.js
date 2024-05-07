const { name } = require("../../Commands/SuperBan");

// Define the user model
module.exports = {
    BanUser: {
        id, // String
        reason, // String
        date, // Date
        userID, // String
        userName, // String
        warns, // Number
    }
}