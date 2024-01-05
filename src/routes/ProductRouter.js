const express = require('express');
const ProductController = require('../controllers/ProductController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', ProductController.createProduct);
router.put('/update/:id', authMiddleware, ProductController.updateProduct);
router.get('/get-details/:id', ProductController.getDetailsProduct);
router.delete('/delete/:id',authMiddleware, ProductController.deleteProduct);
router.get('/get-all', ProductController.getAllProduct);

module.exports = router;