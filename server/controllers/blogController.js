const Blog = require('../models/blog');
const asyncHandler = require('express-async-handler');

const createBlog = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        throw new Error('Missing inputs');
    }
    const response = await Blog.create(req.body);
    return res.json({
        success: response ? true : false,
        message: response ? 'Create blog successfully' : 'Something went wrong',
        createdBlog: response
    })
})

const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find();
    return res.json({
        success: blogs ? true : false,
        blogList: blogs
    })
})

const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (Object.keys(req.body).length === 0) {
        throw new Error('Missing inputs');
    }
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
    console.log(bid);
    return res.json({
        success: response ? true : false,
        message: response ? 'Update blog successfully' : 'Something went wrong',
        updatedBlog: response
    })
})

const deleteBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const response = await Blog.findByIdAndDelete(bid);
    return res.json({
        success: response ? true : false,
        message: response ? 'Delete blog successfully' : 'Something went wrong',
        deleteBlog: response
    })
})

const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) {
        throw new Error('Missing inputs');
    }
    const blog = await Blog.findById(bid);
    const alreadyDisliked = await blog.disLikes.find(item => item.toString() === _id);
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid,
            {
                $pull: {
                    disLikes: _id,
                    isDisLiked: false,
                }
            },
            { new: true });
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    const isLiked = await blog.likes.find(item => item.toString() === _id);
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
        return res.json({
            success: response ? true : false,
            rs: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true });
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
})

const disLikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) {
        throw new Error('Missing inputs');
    }
    const blog = await Blog.findById(bid);
    const alreadyLiked = await blog.likes.find(item => item.toString() === _id);
    if (alreadyLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    const isDisLiked = await blog.disLikes.find(item => item.toString() === _id);
    if (isDisLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { disLikes: _id } }, { new: true });
        return res.json({
            success: response ? true : false,
            rs: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { disLikes: _id } }, { new: true });
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
})


const getBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberView: 1 } }, { new: true })
        .populate('disLikes', 'firstname lastname')
        .populate('likes', 'firstname lastname');
    return res.json({
        success: blog ? true : false,
        blog,
    })
})

const uploadImageBlog = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new Error('Missing inputs');
    }
    const { bid } = req.params;
    const product = await Blog.findByIdAndUpdate(bid, { image: req.file.path }, { new: true });
    return res.json({
        success: product ? true : false,
        product
    });
})

module.exports = {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
    likeBlog,
    disLikeBlog,
    getBlog,
    uploadImageBlog,
}