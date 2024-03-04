const { json, response } = require('express');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const createProduct = asyncHandler(async (req, res) => {
    const { title, price, description, brand, category, color } = req.body;
    const thumb = req?.files?.thumb[0]?.path;
    const images = req?.files?.images?.map(item => item.path);
    if (!title && !price && !description && !brand && !category && !color) {
        throw new Error('Missing inputs');
    }
    req.body.slug = slugify(title);
    if (thumb) req.body.thumb = thumb;
    if (images) req.body.images = images;
    let response = await Product.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Create product successfully' : 'Something went wrong',
        newProduct: response,
    })
})

const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const product = await Product.findById(pid).populate({
        path: 'ratings',
        populate: {
            path: 'postedBy',
            select: 'firstname lastname avatar'
        }
    });
    return res.status(200).json({
        success: product ? true : false,
        productData: product,
    })
})

const getProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query };

    //Tách các trường hợp ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach(item => delete queries[item]);

    //Format các operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, item => `$${item}`)
    const formatedQuery = JSON.parse(queryString);
    let colorQueryObject = {};
    let searchQueryObject = {};

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
    if (queries?.color) {
        delete formatedQuery.color
        const colorArr = queries.color?.split(',');
        const colorQuery = colorArr.map(item => ({ color: { $regex: item, $options: 'i' } }));
        colorQueryObject = { $or: colorQuery }
    }
    if (queries?.search) {
        delete formatedQuery.search;
        searchQueryObject = {
            $or: [
                {
                    title: {
                        $regex: queries.search,
                        $options: 'i'
                    },
                },
                {
                    category: {
                        $regex: queries.search,
                        $options: 'i'
                    },
                },
                {
                    description: {
                        $regex: queries.search,
                        $options: 'i'
                    },
                },
                {
                    color: {
                        $regex: queries.search,
                        $options: 'i'
                    },
                },
                {
                    brand: {
                        $regex: queries.search,
                        $options: 'i'
                    }
                }
            ]
        }
    }
    const q = { ...colorQueryObject, ...searchQueryObject, ...formatedQuery };
    console.log(q);
    let queryCommand = Product.find(q);

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
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1) * limit;
    queryCommand = queryCommand.skip(skip).limit(limit);

    //Excecute query
    queryCommand.then(async (response) => {
        const counts = await Product.find(q).countDocuments();
        return res.json({
            success: response ? true : false,
            counts,
            products: response ? response : 'Can not get products'
        })
    }).catch((err) => {
        throw new Error(err.message);
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

const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, comment, pid, updatedAt } = req.body;
    if (!star || !pid) {
        throw new Error('Missing inputs');
    }
    const ratingProduct = await Product.findById(pid);
    const alreadyRating = ratingProduct.ratings?.find(item => item.postedBy.toString() === _id);
    if (alreadyRating) {
        //update star and comment
        await Product.updateOne({
            ratings: { $elemMatch: alreadyRating }
        }, {
            $set: {
                "ratings.$.star": star,
                "ratings.$.comment": comment,
                "ratings.$.updatedAt": updatedAt,
            }
        }, { new: true })
    } else {
        //add star and comment
        await Product.findByIdAndUpdate(pid, {
            $push: {
                ratings: {
                    star,
                    comment,
                    postedBy: _id,
                    updatedAt
                }
            }
        }, { new: true })
    }
    const updateProduct = await Product.findById(pid);
    const ratingCount = updateProduct.ratings.length;
    const sumRatings = updateProduct.ratings.reduce((prev, current) => prev + current.star, 0);
    ratingProduct.totalRating = Math.round(sumRatings * 10 / ratingCount) / 10;
    await ratingProduct.save();

    return res.status(200).json({
        success: true,
        message: 'Rating successfully'
    })
})

const uploadImageProduct = asyncHandler(async (req, res) => {
    if (!req.files) {
        throw new Error('Missing inputs');
    }
    const { pid } = req.params;
    const product = await Product.findByIdAndUpdate(pid, {
        $push: {
            images: { $each: req.files.map(item => item.path) }
        }
    }, { new: true });
    return res.json({
        success: product ? true : false,
        product
    });
})




module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    ratings,
    uploadImageProduct,
}