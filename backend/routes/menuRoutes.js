const express = require('express');
const { getMenuByRestaurant, getMenuItem } = require('../controllers/menuController');

const router = express.Router();

router.get('/restaurant/:restaurantId', getMenuByRestaurant);
router.get('/item/:id', getMenuItem);

module.exports = router;
