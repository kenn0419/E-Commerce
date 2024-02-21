const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/register', userController.register);
router.put('/final-register/:token', userController.finalRegister);
router.post('/login', userController.login);
router.post('/refresh-token', userController.refreshAccessToken);
router.post('/logout', verifyAccessToken, userController.logout);
router.get('/current', verifyAccessToken, userController.getCurrent);
router.post('/forget-password', userController.forgetPassword);
router.put('/reset-password', userController.resetPassword);
router.get('/', [verifyAccessToken, isAdmin], userController.getUsers);
router.delete('/:uid', [verifyAccessToken, isAdmin], userController.deleteUser);
router.put('/current', [verifyAccessToken], userController.updateUser);
router.put('/add-cart', [verifyAccessToken], userController.addIntoCart);
router.put('/update-address', [verifyAccessToken], userController.updateAddressUser);
router.put('/:uid', [verifyAccessToken, isAdmin], userController.updateUserByAdmin);

module.exports = router;