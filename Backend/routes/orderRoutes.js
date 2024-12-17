const express = require('express');
const router = express.Router();
const orderController = require('../controllers/Ordercontroller');
const protect = require('../Middleware/authMiddleware'); // Import middleware
// Create a new order
router.post('/create',protect, orderController.createOrder);
// Get all orders for a user
router.get('/user/orders', protect,orderController.getUserOrders);
module.exports = router;
