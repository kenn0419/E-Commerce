const userRouter = require('./user');
const blogRouter = require('./blog');
const orderRouter = require('./order');
const brandRouter = require('./brand');
const couponRouter = require('./coupon');
const productRouter = require('./product');
const fileInsertRouter = require('./fileInsert');
const blogCategoryRouter = require('./blogCategory');
const productCategoryRouter = require('./productCategory');
const { notFound, errorHandler } = require('../middlewares/errorHandler')

const initRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/blog', blogRouter);
    app.use('/api/brand', brandRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/coupon', couponRouter);
    app.use('/api/product', productRouter);
    app.use('/api/fileInsert', fileInsertRouter);
    app.use('/api/blogCategory', blogCategoryRouter);
    app.use('/api/productCategory', productCategoryRouter);

    app.use(notFound);
    app.use(errorHandler);
}

module.exports = initRoutes