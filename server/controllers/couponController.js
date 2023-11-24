const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

const createCoupon = asyncHandler(async (req, res) => {
    const { name, discount, expiry } = req.body;
    if (!name || !discount || !expiry) {
        throw new Error('Missing inputs');
    }
    const response = await Coupon.create({ ...req.body, expiry: Date.now() + expiry * 24 * 60 * 60 * 1000 });
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Create Coupon successfully' : 'Something went wrong',
        createdCoupon: response,
    })
})

const getCoupons = asyncHandler(async (req, res) => {
    const response = await Coupon.find();
    return res.status(200).json({
        success: response ? true : false,
        couponList: response,
    })
})

const updateCoupon = asyncHandler(async (req, res) => {
    const { cpid } = req.params;
    if (Object.keys(req.body).length === 0) {
        throw new Error('Missing inputs');
    }
    if (req.body.expiry) {
        req.body.expiry = Date.now() + req.body.expiry * 24 * 60 * 60 * 1000;
    }
    const response = await Coupon.findByIdAndUpdate(cpid, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Update Coupon successfully' : 'Something went wrong',
        updatedCoupon: response,
    })
})

const deleteCoupon = asyncHandler(async (req, res) => {
    const { cpid } = req.params;
    const response = await Coupon.findByIdAndDelete(cpid);
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Delete Coupon successfully' : 'Something went wrong',
        deletedCoupon: response,
    })
})

module.exports = {
    createCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon,
}
