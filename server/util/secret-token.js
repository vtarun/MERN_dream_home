const jwt = require("jsonwebtoken");
require('dotenv').config();
module.exports.createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60,
    });
}