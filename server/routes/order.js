const router = require('express').Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const orderController = require('../controllers/orderController');

router.get('/', verifyAccessToken, orderController.getUserOrder);
router.get('/admin', [verifyAccessToken, isAdmin], orderController.getOrders);
router.post('/', [verifyAccessToken], orderController.createOrder);
router.put('/:oid', [verifyAccessToken, isAdmin], orderController.updateStatus);



module.exports = router;