const router = require('express').Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const productCategoryController = require('../controllers/productCategoryController');

router.get('/', productCategoryController.getCategories);
router.post('/', [verifyAccessToken, isAdmin], productCategoryController.createCategory);
router.put('/:cid', [verifyAccessToken, isAdmin], productCategoryController.updateCategory);
router.delete('/:cid', [verifyAccessToken, isAdmin], productCategoryController.deleteCategory);

module.exports = router;