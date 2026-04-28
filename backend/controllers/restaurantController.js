const Restaurant = require('../models/Restaurant');

const getRestaurants = async (req, res) => {
  try {
    const { cuisine, rating, isVeg, priceRange, sortBy } = req.query;
    
    let query = {};

    if (cuisine) {
      query.cuisine = { $in: [cuisine] };
    }

    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }

    if (isVeg === 'true') {
      query.isVeg = true;
    }

    if (priceRange) {
      query.priceRange = priceRange;
    }

    let restaurants = Restaurant.find(query);

    if (sortBy === 'rating') {
      restaurants = restaurants.sort({ rating: -1 });
    } else if (sortBy === 'deliveryTime') {
      restaurants = restaurants.sort({ deliveryTime: 1 });
    } else if (sortBy === 'priceRange') {
      restaurants = restaurants.sort({ priceRange: 1 });
    }

    const result = await restaurants;
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getRestaurants, getRestaurantById };
