const Product = require('../models/product');
const productCategory = require('../models/productCategory');
const slugify = require('slugify');
const data = require('../../data/ecommerce.json');
const categoryData = require('../../data/cate_brand');
const asyncHandler = require('express-async-handler');

const fn = async (product) => {
    await Product.create({
        title: product?.name,
        slug: slugify(product?.name) + Math.round(Math.random() * 100),
        description: product?.description,
        brand: product?.brand,
        thumb: product?.thumb,
        price: Math.round(Number(product?.price?.match(/\d/g).join('')) / 100),
        category: product?.category[1],
        quantity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 100),
        images: product?.images,
        color: product?.variants?.find(item => item.label === 'Color')?.variants[0],
        totalRating: Math.round(Math.random() * 5),
    })
}

const insertProduct = asyncHandler(async (req, res) => {
    const promises = [];
    for (let category of data) {
        promises.push(fn(category));
    }
    await Promise.all(promises);
    return res.json('Done');
})

const fn2 = async (category) => {
    await productCategory.create({
        title: category?.cate,
        brand: category?.brand,
        image: category?.image,
    })
}

const insertCategory = asyncHandler(async (req, res) => {
    const promises = [];
    for (let category of categoryData) {
        promises.push(fn2(category));
    }
    await Promise.all(promises);
    return res.json('Done');
})

module.exports = {
    insertProduct,
    insertCategory,
}