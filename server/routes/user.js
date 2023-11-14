const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh-token', userController.refreshAccessToken);
router.post('/logout', verifyAccessToken, userController.logout);
router.get('/current', verifyAccessToken, userController.getCurrent);

module.exports = router;