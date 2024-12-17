const Order = require('../models/order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User is not authenticated' });
    }

    const { method, size, crust, toppings, quantity, totalPrice } = req.body;
    const order = new Order({
      userId: req.user.id, // Attach authenticated user ID
      method,
      size,
      crust,
      toppings,
      quantity,
      totalPrice,
    });

    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all orders for the authenticated user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }); // Use authenticated user ID
    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
