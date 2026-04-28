const MenuItem = require('../models/MenuItem');

const getMenuByRestaurant = async (req, res) => {
  try {
    const { isVeg, minPrice, maxPrice } = req.query;
    
    let query = { restaurantId: req.params.restaurantId };

    if (isVeg === 'true') {
      query.isVeg = true;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const menuItems = await MenuItem.find(query);
    
    const groupedMenu = menuItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    res.json(groupedMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (menuItem) {
      res.json(menuItem);
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getMenuByRestaurant, getMenuItem };
