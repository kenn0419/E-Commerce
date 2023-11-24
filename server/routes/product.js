const router = require('express').Router();
const productController = require('../controllers/productController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config');

router.post('/', [verifyAccessToken, isAdmin], productController.createProduct);
router.get('/', productController.getProducts);
router.put('/ratings', [verifyAccessToken], productController.ratings);

router.put('/upload-image/:pid', [verifyAccessToken, isAdmin], uploader.single('images'), productController.uploadImageProduct);
router.delete('/:pid', [verifyAccessToken, isAdmin], productController.deleteProduct);
router.put('/:pid', [verifyAccessToken, isAdmin], productController.updateProduct);
router.get('/:pid', productController.getProduct);

module.exports = router;