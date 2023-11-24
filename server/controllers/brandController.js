const Brand = require('../models/brand');
const asyncHandler = require('express-async-handler');

const createBrand = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        throw new Error('Missing inputs');
    }
    const response = await Brand.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Create Brand successfully' : 'Something went wrong',
        createdBrand: response,
    })
})

const getBrand = asyncHandler(async (req, res) => {
    const response = await Brand.find().select('title _id');
    return res.status(200).json({
        success: response ? true : false,
        BrandList: response,
    })
})

const updateBrand = asyncHandler(async (req, res) => {
    const { brid } = req.params;
    if (Object.keys(req.body).length === 0) {
        throw new Error('Missing inputs');
    }
    const response = await Brand.findByIdAndUpdate(brid, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Update Brand successfully' : 'Something went wrong',
        updatedBrand: response,
    })
})

const deleteBrand = asyncHandler(async (req, res) => {
    const { brid } = req.params;
    const response = await Brand.findByIdAndDelete(brid);
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Delete Brand successfully' : 'Something went wrong',
        deletedBrand: response,
    })
})

module.exports = {
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand,
}
