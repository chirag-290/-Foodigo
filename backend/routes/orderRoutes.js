const express = require('express');
const { createOrder, getUserOrders, getOrderById } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, getUserOrders);

router.get('/:id', protect, getOrderById);

module.exports = router;
