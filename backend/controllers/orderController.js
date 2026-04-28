const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { restaurantId, restaurantName, items, totalPrice, deliveryAddress } = req.body;

    const order = await Order.create({
      userId: req.user._id,
      restaurantId,
      restaurantName,
      items,
      totalPrice,
      deliveryAddress,
      status: 'Placed',
      paymentMethod: 'COD'
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('restaurantId');
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('restaurantId');
    
    if (order && order.userId.toString() === req.user._id.toString()) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createOrder, getUserOrders, getOrderById };
