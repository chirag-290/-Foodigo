const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  cuisine: {
    type: [String],
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  deliveryTime: {
    type: Number,
    required: true
  },
  priceRange: {
    type: String,
    enum: ['Under ₹200', '₹200-₹500', '₹500+'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  isVeg: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
