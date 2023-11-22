require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateAccessToken = (userId, role) => {
    return jwt.sign({ _id: userId, role: role }, process.env.JWT_SECRET, { expiresIn: '300s' });
}

const generateRefreshToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '600s' });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
}