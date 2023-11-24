const router = require('express').Router();
const blogController = require('../controllers/blogController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.get('/', blogController.getBlogs);
router.post('/', [verifyAccessToken, isAdmin], blogController.createBlog);
router.put('/like', [verifyAccessToken], blogController.likeBlog);
router.put('/dislike', [verifyAccessToken], blogController.disLikeBlog);
router.put('/:bid', [verifyAccessToken, isAdmin], blogController.updateBlog);
router.delete('/:bid', [verifyAccessToken, isAdmin], blogController.deleteBlog);


module.exports = router;
