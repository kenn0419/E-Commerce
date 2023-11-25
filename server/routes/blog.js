const router = require('express').Router();
const blogController = require('../controllers/blogController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploader = require('../config/cloudinary.config');


router.get('/', blogController.getBlogs);
router.post('/', [verifyAccessToken, isAdmin], blogController.createBlog);
router.get('/:bid', blogController.getBlog);
router.put('/like/:bid', [verifyAccessToken], blogController.likeBlog);
router.put('/dislike/:bid', [verifyAccessToken], blogController.disLikeBlog);
router.put('/:bid', [verifyAccessToken, isAdmin], blogController.updateBlog);
router.delete('/:bid', [verifyAccessToken, isAdmin], blogController.deleteBlog);
router.put('/upload-image/:bid', [verifyAccessToken, isAdmin], uploader.single('image'), blogController.uploadImageBlog);

module.exports = router;
