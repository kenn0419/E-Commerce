const router = require('express').Router();
const couponController = require('../controllers/couponController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.get('/', couponController.getCoupons);
router.post('/', [verifyAccessToken, isAdmin], couponController.createCoupon);
router.put('/:cpid', [verifyAccessToken, isAdmin], couponController.updateCoupon);
router.delete('/:cpid', [verifyAccessToken, isAdmin], couponController.deleteCoupon);


module.exports = router;
