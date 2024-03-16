const Order = require('../models/order');
const User = require('../models/user');
const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { products, total, address, status } = req.body;
    await User.findByIdAndUpdate(_id, { address, cart: [] }, { new: true });
    const response = await Order.create({ products, total, status, orderBy: _id });
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
    const queries = { ...req.query };

    //Tách các trường hợp ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach(item => delete queries[item]);

    //Format các operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, item => `$${item}`)
    const formatedQuery = JSON.parse(queryString);

    //Filtering
    if (queries?.title) {
        formatedQuery.title = {
            $regex: queries.title,
            $options: 'i'
        }
    }
    if (queries?.category) {
        formatedQuery.category = {
            $regex: queries.category,
            $options: 'i'
        }
    }

    let queryCommand = Order.find(formatedQuery);

    //Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join('');
        queryCommand = queryCommand.sort(sortBy);
    }

    //Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join('');
        queryCommand = queryCommand.select(fields);
    }

    //Pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1) * limit;
    queryCommand = queryCommand.skip(skip).limit(limit);

    //Excecute query
    queryCommand.then(async (response) => {
        const counts = await Order.find(queryCommand).countDocuments();
        return res.json({
            success: response ? true : false,
            counts,
            orders: response ? response : 'Can not get orders'
        })
    }).catch((err) => {
        throw new Error(err.message);
    })
})

const getUserOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const queries = { ...req.query };

    //Tách các trường hợp ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach(item => delete queries[item]);

    //Format các operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, item => `$${item}`)
    const formatedQuery = JSON.parse(queryString);

    //Filtering
    if (queries?.title) {
        formatedQuery.title = {
            $regex: queries.title,
            $options: 'i'
        }
    }
    if (queries?.search) {
        formatedQuery.search = {
            $regex: queries.search,
            $options: 'i'
        }
    }
    if (queries?.category) {
        formatedQuery.category = {
            $regex: queries.category,
            $options: 'i'
        }
    }

    let queryCommand = Order.find({ ...formatedQuery, orderBy: _id });

    //Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join('');
        queryCommand = queryCommand.sort(sortBy);
    }

    //Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join('');
        queryCommand = queryCommand.select(fields);
    }

    //Pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1) * limit;
    queryCommand = queryCommand.skip(skip).limit(limit);

    //Excecute query
    queryCommand.then(async (response) => {
        const counts = await Order.find(queryCommand).countDocuments();
        return res.json({
            success: response ? true : false,
            counts,
            orders: response ? response : 'Can not get orders'
        })
    }).catch((err) => {
        throw new Error(err.message);
    })
})


module.exports = {
    createOrder,
    updateStatus,
    getOrders,
    getUserOrders,
}