require('dotenv').config();
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');
const sendMail = require('../ultils/sendMail');
const crypto = require('crypto');
const makeToken = require('uniqid');


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
    }
    const token = makeToken();
    const newUser = await User.create({
        email: btoa(email),
        password,
        firstname,
        lastname,
        mobile,
        registerToken: token
    })
    if (newUser) {
        const html = `
            <h2>Please copy this code: <span style="color: pink; font-size: 25px;">${token}</span> to active account. This code will have a period of 15 minutes from now on</h2>. 
        `
        await sendMail({ email, html, subject: 'Verify account' })
    }
    setTimeout(async () => {
        await User.deleteOne({ registerToken: token })
    }, 15 * 60 * 1000);
    return res.json({
        success: newUser ? true : false,
        message: newUser ? 'Please check your email to active account' : 'Something went wrong'
    })
})

const finalRegister = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const notActiveUser = await User.findOne({ registerToken: token });
    if (notActiveUser) {
        notActiveUser.email = atob(notActiveUser.email);
        notActiveUser.registerToken = '';
        await notActiveUser.save();
        return res.json({
            success: true,
            message: 'Account is activated successfully. Please to sign in!'
        })
    }
    return res.json({
        success: false,
        message: 'Verify code is correctly or it is expired. Please sign up again',
    })
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
        const { password, role, refreshToken, ...userData } = response.toObject();
        const accessToken = generateAccessToken(response._id, role);
        const newRefreshToken = generateRefreshToken(response._id);
        await User.findByIdAndUpdate(response._id, { newRefreshToken }, { new: true });
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 5 * 24 * 60 * 60 * 1000 })
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
    const user = await User.findById(_id).select('-refreshToken -password').populate({
        path: 'cart',
        populate: {
            path: 'product',
            select: 'title thumb price color category'
        }
    }).populate('wishList', 'title thumb price color');
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

const forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new Error('Missing email')
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const resetToken = await user.createPasswordChangeToken();
    await user.save();
    const html = `
        <b style="color: pink; font-size: 25px;">Please click the below link to reset password</b>. 
        <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here!!!</a>
    `

    const data = {
        email,
        html,
        subject: 'Forgot Password'
    }

    const result = await sendMail(data);
    return res.status(200).json({
        success: result.response?.includes('OK') ? true : false,
        message: result.response?.includes('OK') ? 'Please check email to receive code' : 'Wrong. Please try again!'
    })
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body;
    if (!password || !token) {
        throw new Error('Missing inputs');
    }
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } });
    if (!user) {
        throw new Error('Invalid reset token');
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordChangeAt = Date.now();
    user.passwordResetExpires = undefined;
    await user.save();
    return res.status(200).json({
        success: user ? true : false,
        message: user ? 'Change password successfully' : 'Something went wrong'
    })
})

const getUsers = asyncHandler(async (req, res) => {
    const queries = { ...req.query };

    //Tách các trường hợp ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach(item => delete queries[item]);

    //Format các operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, item => `$${item}`)
    const formatedQuery = JSON.parse(queryString);

    //Filtering
    if (queries?.q) {
        delete formatedQuery.q;
        formatedQuery['$or'] = [
            {
                firstname: {
                    $regex: queries.q,
                    $options: 'i'
                }
            },
            {
                lastname: {
                    $regex: queries.q,
                    $options: 'i'
                }
            },
            {
                email: {
                    $regex: queries.q,
                    $options: 'i'
                }
            }
        ]
    }
    let queryCommand = User.find(formatedQuery);

    //Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    }

    //Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        queryCommand = queryCommand.select(fields);
    }

    //Pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_USERS;
    const skip = (page - 1) * limit;
    queryCommand = queryCommand.skip(skip).limit(limit);

    //Excecute query
    queryCommand.then(async (response) => {
        const counts = await User.find(formatedQuery).countDocuments();
        return res.json({
            success: response ? true : false,
            counts,
            users: response ? response : 'Can not get users'
        })
    }).catch((err) => {
        throw new Error(err.message);
    })
})

const deleteUser = asyncHandler(async (req, res) => {
    const { uid } = req.params;
    const response = await User.findByIdAndDelete(uid);
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Delete user successfully' : 'Something went wrong'
    })
})

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { firstname, lastname, email, mobile, address } = req.body;
    const data = { firstname, lastname, email, mobile, address };
    if (req.file) {
        data.avatar = req.file.path;
    }
    const user = await User.findByIdAndUpdate(_id, data, { new: true }).select('-password -role -refreshToken');
    return res.status(200).json({
        success: user ? true : false,
        message: user ? 'Update successfully' : 'Something went wrong',
        updatedUser: user ? user : ''
    })
})

const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params;
    if (Object.keys(req.body).length === 0) {
        throw new Error('Missing inputs');
    }
    const user = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -role -refreshToken');
    return res.status(200).json({
        success: user ? true : false,
        message: user ? 'Update user successfully' : 'Something went wrong',
        updatedUser: user ? user : ''
    })
})

const updateAddressUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!req.body.address) {
        throw new Error('Missing input');
    }
    const user = await User.findById(_id);
    const alreadyAddress = await user.address.includes(req.body.address);
    if (alreadyAddress) {
        throw new Error('Address is duplicated. Please re-enter!');
    }
    const response = await User.findByIdAndUpdate(_id, { $push: { address: req.body.address } }, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Update address successfully' : 'Something went wrong',
    })
})

const addIntoCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { pid, quantity = 1, color = 'black', price, thumbNail, title } = req.body;
    if (!pid || !color || !price || !thumbNail || !title) {
        throw new Error('Missing input');
    }
    const user = await User.findById(_id);
    const alreadyProduct = user.cart.find(item => item.product.toString() === pid && item.color === color);
    if (alreadyProduct) {
        const response = await User.updateOne(
            { cart: { $elemMatch: alreadyProduct } },
            {
                $set: {
                    "cart.$.quantity": alreadyProduct.quantity + +quantity,
                    "cart.$.price": price,
                    "cart.$.color": color,
                    "cart.$.thumbNail": thumbNail,
                    "cart.$.title": title,
                }
            },
            { new: true }
        )
        return res.status(200).json({
            success: response ? true : false,
            message: response ? 'Add into cart successfully' : 'Something went wrong',
            response,
        })
    } else {
        const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quantity, color, price: price, thumbNail, title } } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            message: response ? 'Add into cart successfully' : 'Something went wrong',
            response,
        })
    }
})

const removeProductFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { pid, color } = req.params;
    const user = await User.findById(_id);
    const alreadyProduct = user.cart.find(item => item.product._id.toString() === pid && item.color === color);
    if (!alreadyProduct) {
        return res.status(200).json({
            success: true,
            message: 'Don\'t find product',
        })
    } else {
        const response = await User.findByIdAndUpdate(_id, { $pull: { cart: { product: pid, color } } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            message: response ? 'Remove from cart successfully' : 'Something went wrong',
            response,
        })
    }
})

const updateWishList = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { pid } = req.params;
    const user = await User.findById(_id);
    const alReadyWishList = user.wishList.find(item => item.toString() === pid);
    if (alReadyWishList) {
        const response = await User.findByIdAndUpdate(_id,
            {
                $pull: {
                    wishList: pid,
                }
            },
            { new: true });
        return res.json({
            success: response ? true : false,
            message: response ? 'Remove from wishlist' : 'Something went wrong'
        })
    } else {
        const response = await User.findByIdAndUpdate(_id,
            {
                $push: {
                    wishList: pid,
                }
            },
            { new: true });
        return res.json({
            success: response ? true : false,
            message: response ? 'Add into wishlist' : 'Something went wrong'
        })
    }
})

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgetPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    updateAddressUser,
    addIntoCart,
    removeProductFromCart,
    finalRegister,
    updateWishList,
}