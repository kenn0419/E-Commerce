const router = require('express').Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const blogCategory = require('../controllers/blogCategoryController');

router.get('/', blogCategory.getCategories);
router.post('/', [verifyAccessToken, isAdmin], blogCategory.createCategory);
router.put('/:cid', [verifyAccessToken, isAdmin], blogCategory.updateCategory);
router.delete('/:cid', [verifyAccessToken, isAdmin], blogCategory.deleteCategory);

module.exports = router;