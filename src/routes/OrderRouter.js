const express = require('express');
const OrderController = require('../controllers/OrderController');
const { authUserMiddleware, authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create/:id', authUserMiddleware, OrderController.createOrder);
router.get('/get-all-order/:id', authUserMiddleware, OrderController.getAllOrderDetails);
router.get('/get-details-order/:id', OrderController.getDetailsOrder);
router.delete('/delete-order/:id', OrderController.deleteOrder);
router.get('/get-all-order', authMiddleware, OrderController.getAllOrder);
router.post('/delete-many',authMiddleware, OrderController.deleteMany);

module.exports = router;