const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        throw new Error('Missing inputs');
    }
    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    let response = await Product.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Create product successfully' : 'Something went wrong',
        newProduct: response,
    })
})

const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const product = await Product.findById(pid);
    return res.status(200).json({
        success: product ? true : false,
        newProduct: product,
    })
})

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    return res.status(200).json({
        success: products ? true : false,
        productList: products,
    })
})

const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const product = await Product.findByIdAndUpdate(pid, req.body, { new: true });
    return res.status(200).json({
        success: product ? true : false,
        message: product ? 'Update successfully' : 'Something went wrong',
        updateProduct: product,
    })
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const product = await Product.findByIdAndDelete(pid);
    return res.status(200).json({
        success: product ? true : false,
        message: product ? 'Delete successfully' : 'Something went wrong',
        deleteProduct: product,
    })
})


module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
}