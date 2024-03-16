const router = require('express').Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const orderController = require('../controllers/orderController');

router.get('/admin', [verifyAccessToken, isAdmin], orderController.getOrders);
router.get('/', verifyAccessToken, orderController.getUserOrders);
router.post('/', [verifyAccessToken], orderController.createOrder);
router.put('/:oid', [verifyAccessToken, isAdmin], orderController.updateStatus);



module.exports = router;