const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const { response } = require('express');

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname, mobile } = req.body;
    if (!email || !password || !firstname || !lastname || !mobile) {
        return res.status(400).json({
            success: false,
            message: 'Missing inputs'
        })
    }
    const user = await User.findOne({ email: email });
    if (user) {
        throw new Error('User has existed');
    } else {
        const newUser = await User.create(req.body);
        return res.status(200).json({
            success: newUser ? true : false,
            message: newUser ? 'Registered successfully!!!' : 'Something went wrong'
        })
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing inputs'
        })
    }
    const response = await User.findOne({ email: email });
    if (response && await response.isCorrectPassword(password)) {
        const { password, role, ...userData } = response.toObject();
        const accessToken = generateAccessToken(response._id, role);
        const refreshToken = generateRefreshToken(response._id);
        await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 5 * 24 * 60 * 60 * 1000 })
        return res.status(200).json({
            success: true,
            message: 'Login successfully',
            accessToken,
            userData,
        })
    } else {
        throw new Error('Email or password is correct!!!');
    }
})

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id).select('-refreshToken -password -role');
    return res.status(200).json({
        success: true,
        data: user ? user : 'User not found'
    })
})

module.exports = {
    register,
    login,
    getCurrent,
}