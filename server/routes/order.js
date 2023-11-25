const router = require('express').Router();
const { verifyAccessToken } = require('../middlewares/verifyToken');
const orderController = require('../controllers/orderController');


router.post('/', [verifyAccessToken], orderController.createOrder);



module.exports = router;