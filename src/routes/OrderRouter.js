const express = require('express');
const OrderController = require('../controllers/OrderController');
const { authUserMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authUserMiddleware, OrderController.createOrder);

module.exports = router;