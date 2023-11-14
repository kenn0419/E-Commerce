require('dotenv').config();
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const { response } = require('express');
const jwt = require('jsonwebtoken');

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

const refreshAccessToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie && !cookie.refreshToken) {
        throw new Error('No refresh token in cookie');
    }
    const result = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
    const response = await User.findOne({ _id: result._id, refreshToken: cookie.refreshToken });
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Invalid refresh token'
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) {
        throw new Error('No refresh token in cookies');
    }
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: response ? true : false,
        message: 'Log out successfully'
    })
})

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
}