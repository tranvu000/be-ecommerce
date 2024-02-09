const express = require('express');
const OrderController = require('../controllers/OrderController');
const { authUserMiddleware, authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authUserMiddleware, OrderController.createOrder);
router.get('/get-all-order-details/:id', authUserMiddleware, OrderController.getAllOrderDetails);
router.get('/get-details-order/:id', authUserMiddleware, OrderController.getDetailsOrder);
router.delete('/delete-order/:id', authUserMiddleware, OrderController.deleteOrder);
router.get('/get-all-order', authMiddleware, OrderController.getAllOrder);

module.exports = router;