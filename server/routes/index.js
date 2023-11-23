const userRouter = require('./user');
const productRouter = require('./product');
const productCategoryRouter = require('./productCategory');
const blogCategoryRouter = require('./blogCategory');
const { notFound, errorHandler } = require('../middlewares/errorHandler')

const initRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/blogCategory', blogCategoryRouter);
    app.use('/api/productCategory', productCategoryRouter);

    app.use(notFound);
    app.use(errorHandler);
}

module.exports = initRoutes