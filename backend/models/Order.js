const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  restaurantName: {
    type: String,
    required: true
  },
  items: [orderItemSchema],
  totalPrice: {
    type: Number,
    required: true
  },
  deliveryAddress: {
    label: String,
    addressLine: String,
    city: String,
    state: String,
    pincode: String,
    location: String
  },
  status: {
    type: String,
    enum: ['Placed', 'Preparing', 'Out for delivery', 'Delivered'],
    default: 'Placed'
  },
  paymentMethod: {
    type: String,
    default: 'COD'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
