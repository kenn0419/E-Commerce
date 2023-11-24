const router = require('express').Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const brandController = require('../controllers/brandController');

router.get('/', brandController.getBrand);
router.post('/', [verifyAccessToken, isAdmin], brandController.createBrand);
router.put('/:brid', [verifyAccessToken, isAdmin], brandController.updateBrand);
router.delete('/:brid', [verifyAccessToken, isAdmin], brandController.deleteBrand);

module.exports = router;