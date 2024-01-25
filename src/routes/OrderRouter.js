const express = require('express');
const OrderController = require('../controllers/OrderController');
const { authUserMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authUserMiddleware, OrderController.createOrder);
router.get('/get-all-order/:id', authUserMiddleware, OrderController.getAllOrder);
router.get('/get-details-order/:id', authUserMiddleware, OrderController.getDetailsOrder);
router.delete('/delete-order/:id', authUserMiddleware, OrderController.deleteOrder);

module.exports = router;