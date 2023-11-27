const Order = require('../models/order');
const User = require('../models/user');
const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { coupon } = req.body;
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price');
    const products = userCart.cart.map(item => ({
        product: item.product._id,
        count: item.quantity,
        color: item.color
    }))
    let total = userCart.cart.reduce((prev, current) => prev + current.product.price * current.quantity, 0);
    if (coupon) {
        const getCoupon = await Coupon.findById(coupon);
        total = Math.round(total * (1 - getCoupon.discount / 100) / 1000) * 1000;
    }
    const response = await Order.create({ products, total, coupon, orderBy: _id });
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