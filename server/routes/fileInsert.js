const router = require('express').Router();
const insertDataController = require('../controllers/insertDataController');

router.post('/', insertDataController.insertProduct);
router.post('/cate', insertDataController.insertCategory);

module.exports = router;