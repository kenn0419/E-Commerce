const Order = require('../models/order');
const User = require('../models/user');
const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { product, total } = req.body;

    const response = await Order.create({ product, total, orderBy: _id });
    return res.json({
        success: response ? true : false,
        message: response ? 'Create order successfully' : 'Something went wrong',
        response,
    })
})

const updateStatus = asyncHandler(async (req, res) => {
    const { oid } = req.params;
    const { status } = req.body;
    if (!status) {
        throw new Error('Missing inputs');
    }
    const response = await Order.findByIdAndUpdate(oid, { status }, { new: true })
    return res.json({
        success: response ? true : false,
        message: response ? 'Update status successfully' : 'Something went wrong',
        response,
    })
})

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find();
    return res.json({
        success: orders ? true : false,
        orderList: orders
    })
})

const getUserOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const order = await Order.find({ orderBy: _id });
    return res.json({
        success: order ? true : false,
        order,
    })
})


module.exports = {
    createOrder,
    updateStatus,
    getOrders,
    getUserOrder,
}