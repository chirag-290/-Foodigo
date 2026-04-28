const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const restaurants = [
  {
    name: 'Punjabi Dhaba',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    cuisine: ['North Indian', 'Indian'],
    rating: 4.5,
    deliveryTime: 30,
    priceRange: 'Under ₹200',
    location: 'Connaught Place, Delhi',
    isVeg: false
  },
  {
    name: 'Biryani House',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
    cuisine: ['Biryani', 'Indian'],
    rating: 4.6,
    deliveryTime: 35,
    priceRange: '₹200-₹500',
    location: 'Banjara Hills, Hyderabad',
    isVeg: false
  },
  {
    name: 'Dosa Plaza',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
    cuisine: ['South Indian', 'Indian'],
    rating: 4.4,
    deliveryTime: 20,
    priceRange: 'Under ₹200',
    location: 'Koramangala, Bangalore',
    isVeg: true
  },
  {
    name: 'The Tandoor',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
    cuisine: ['North Indian', 'Mughlai'],
    rating: 4.7,
    deliveryTime: 40,
    priceRange: '₹200-₹500',
    location: 'Juhu, Mumbai',
    isVeg: false
  },
  {
    name: 'Chaat Corner',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    cuisine: ['Street Food', 'Indian'],
    rating: 4.3,
    deliveryTime: 15,
    priceRange: 'Under ₹200',
    location: 'Chandni Chowk, Delhi',
    isVeg: true
  },
  {
    name: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
    cuisine: ['Indian', 'Curry'],
    rating: 4.5,
    deliveryTime: 35,
    priceRange: '₹200-₹500',
    location: 'Indiranagar, Bangalore',
    isVeg: true
  },
  {
    name: 'Dragon Palace',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400',
    cuisine: ['Chinese', 'Asian'],
    rating: 4.2,
    deliveryTime: 30,
    priceRange: '₹200-₹500',
    location: 'Salt Lake, Kolkata',
    isVeg: false
  },
  {
    name: 'Pizza Italia',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    cuisine: ['Italian', 'Pizza'],
    rating: 4.4,
    deliveryTime: 35,
    priceRange: '₹200-₹500',
    location: 'Bandra, Mumbai',
    isVeg: false
  },
  {
    name: 'Burger Barn',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    cuisine: ['American', 'Fast Food'],
    rating: 4.1,
    deliveryTime: 25,
    priceRange: 'Under ₹200',
    location: 'Sector 18, Noida',
    isVeg: false
  },
  {
    name: 'The Fine Plate',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
    cuisine: ['Continental', 'Italian'],
    rating: 4.8,
    deliveryTime: 50,
    priceRange: '₹500+',
    location: 'Nariman Point, Mumbai',
    isVeg: false
  },
  {
    name: 'Sushi Zen',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
    cuisine: ['Japanese', 'Asian'],
    rating: 4.7,
    deliveryTime: 45,
    priceRange: '₹500+',
    location: 'Cyber City, Gurgaon',
    isVeg: false
  },
  {
    name: 'Green Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    cuisine: ['Healthy', 'Vegan'],
    rating: 4.5,
    deliveryTime: 25,
    priceRange: '₹200-₹500',
    location: 'Koregaon Park, Pune',
    isVeg: true
  },
  {
    name: 'Idli Wala',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400',
    cuisine: ['South Indian', 'Indian'],
    rating: 4.3,
    deliveryTime: 20,
    priceRange: 'Under ₹200',
    location: 'T Nagar, Chennai',
    isVeg: true
  },
  {
    name: 'Kebab King',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
    cuisine: ['Mughlai', 'North Indian'],
    rating: 4.6,
    deliveryTime: 40,
    priceRange: '₹200-₹500',
    location: 'Hazratganj, Lucknow',
    isVeg: false
  },
  {
    name: 'The Rooftop',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    cuisine: ['Continental', 'Indian'],
    rating: 4.9,
    deliveryTime: 55,
    priceRange: '₹500+',
    location: 'MG Road, Bangalore',
    isVeg: false
  }
];

const getMenuItems = (restaurantId, restaurantName) => {
  const menus = {
    'Punjabi Dhaba': [
      { category: 'Curries', name: 'Butter Chicken', description: 'Creamy tomato-based chicken curry', price: 180, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300', isVeg: false },
      { category: 'Curries', name: 'Dal Makhani', description: 'Slow-cooked black lentils in butter', price: 140, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300', isVeg: true },
      { category: 'Breads', name: 'Butter Naan', description: 'Soft leavened bread with butter', price: 40, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300', isVeg: true },
      { category: 'Breads', name: 'Tandoori Roti', description: 'Whole wheat bread from tandoor', price: 30, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300', isVeg: true },
      { category: 'Rice', name: 'Jeera Rice', description: 'Basmati rice with cumin', price: 120, image: 'https://images.unsplash.com/photo-1536304993881-ff86e0c9b1b5?w=300', isVeg: true },
      { category: 'Starters', name: 'Paneer Tikka', description: 'Grilled cottage cheese with spices', price: 160, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300', isVeg: true }
    ],
    'Biryani House': [
      { category: 'Biryani', name: 'Hyderabadi Chicken Biryani', description: 'Aromatic basmati rice with tender chicken', price: 280, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300', isVeg: false },
      { category: 'Biryani', name: 'Mutton Biryani', description: 'Slow-cooked mutton with fragrant rice', price: 350, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300', isVeg: false },
      { category: 'Biryani', name: 'Veg Biryani', description: 'Mixed vegetables with basmati rice', price: 220, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300', isVeg: true },
      { category: 'Sides', name: 'Raita', description: 'Yogurt with cucumber and spices', price: 60, image: 'https://images.unsplash.com/photo-1571167366136-b57e07161714?w=300', isVeg: true },
      { category: 'Sides', name: 'Mirchi Ka Salan', description: 'Spicy chilli curry', price: 80, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300', isVeg: true },
      { category: 'Desserts', name: 'Double Ka Meetha', description: 'Hyderabadi bread pudding', price: 90, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300', isVeg: true }
    ],
    'Dosa Plaza': [
      { category: 'Dosas', name: 'Masala Dosa', description: 'Crispy dosa with spiced potato filling', price: 90, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=300', isVeg: true },
      { category: 'Dosas', name: 'Rava Dosa', description: 'Crispy semolina dosa', price: 100, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300', isVeg: true },
      { category: 'Dosas', name: 'Cheese Dosa', description: 'Dosa loaded with cheese', price: 130, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=300', isVeg: true },
      { category: 'Idli', name: 'Idli Sambar', description: 'Steamed rice cakes with lentil soup', price: 70, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300', isVeg: true },
      { category: 'Vada', name: 'Medu Vada', description: 'Crispy lentil donuts with chutney', price: 80, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300', isVeg: true },
      { category: 'Beverages', name: 'Filter Coffee', description: 'Traditional South Indian coffee', price: 40, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300', isVeg: true }
    ],
    'The Tandoor': [
      { category: 'Starters', name: 'Seekh Kebab', description: 'Minced meat kebabs from tandoor', price: 280, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300', isVeg: false },
      { category: 'Starters', name: 'Paneer Tikka', description: 'Marinated cottage cheese grilled in tandoor', price: 240, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300', isVeg: true },
      { category: 'Curries', name: 'Rogan Josh', description: 'Kashmiri lamb curry with aromatic spices', price: 380, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300', isVeg: false },
      { category: 'Curries', name: 'Shahi Paneer', description: 'Cottage cheese in rich cream gravy', price: 280, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300', isVeg: true },
      { category: 'Breads', name: 'Garlic Naan', description: 'Naan topped with garlic and butter', price: 60, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300', isVeg: true },
      { category: 'Desserts', name: 'Gulab Jamun', description: 'Soft milk dumplings in sugar syrup', price: 80, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300', isVeg: true }
    ],
    'Chaat Corner': [
      { category: 'Chaat', name: 'Pani Puri', description: 'Crispy puris with spiced water', price: 50, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300', isVeg: true },
      { category: 'Chaat', name: 'Bhel Puri', description: 'Puffed rice with chutneys and veggies', price: 60, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300', isVeg: true },
      { category: 'Chaat', name: 'Aloo Tikki', description: 'Crispy potato patties with chutneys', price: 70, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300', isVeg: true },
      { category: 'Chaat', name: 'Dahi Puri', description: 'Puris filled with yogurt and chutneys', price: 80, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300', isVeg: true },
      { category: 'Snacks', name: 'Samosa', description: 'Crispy pastry with spiced potato filling', price: 30, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300', isVeg: true },
      { category: 'Beverages', name: 'Lassi', description: 'Chilled yogurt drink', price: 60, image: 'https://images.unsplash.com/photo-1571167366136-b57e07161714?w=300', isVeg: true }
    ],
    'Spice Garden': [
      { category: 'Curries', name: 'Palak Paneer', description: 'Cottage cheese in spinach gravy', price: 220, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300', isVeg: true },
      { category: 'Curries', name: 'Chana Masala', description: 'Spiced chickpea curry', price: 180, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300', isVeg: true },
      { category: 'Curries', name: 'Kadai Paneer', description: 'Paneer cooked in kadai with peppers', price: 240, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300', isVeg: true },
      { category: 'Rice', name: 'Veg Pulao', description: 'Fragrant rice with mixed vegetables', price: 160, image: 'https://images.unsplash.com/photo-1536304993881-ff86e0c9b1b5?w=300', isVeg: true },
      { category: 'Breads', name: 'Missi Roti', description: 'Spiced gram flour flatbread', price: 40, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300', isVeg: true },
      { category: 'Desserts', name: 'Kheer', description: 'Rice pudding with cardamom', price: 90, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300', isVeg: true }
    ],
    'Dragon Palace': [
      { category: 'Starters', name: 'Chicken Manchurian', description: 'Crispy chicken in spicy sauce', price: 220, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300', isVeg: false },
      { category: 'Starters', name: 'Veg Spring Rolls', description: 'Crispy rolls with vegetable filling', price: 160, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300', isVeg: true },
      { category: 'Mains', name: 'Hakka Noodles', description: 'Stir-fried noodles with vegetables', price: 180, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300', isVeg: true },
      { category: 'Mains', name: 'Chicken Fried Rice', description: 'Wok-tossed rice with chicken', price: 200, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300', isVeg: false },
      { category: 'Mains', name: 'Kung Pao Chicken', description: 'Spicy chicken with peanuts', price: 280, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300', isVeg: false },
      { category: 'Soups', name: 'Hot and Sour Soup', description: 'Tangy spicy vegetable soup', price: 120, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300', isVeg: true }
    ],
    'Pizza Italia': [
      { category: 'Pizzas', name: 'Margherita Pizza', description: 'Classic tomato and mozzarella', price: 249, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300', isVeg: true },
      { category: 'Pizzas', name: 'Chicken BBQ Pizza', description: 'BBQ chicken with onions and peppers', price: 349, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300', isVeg: false },
      { category: 'Pizzas', name: 'Paneer Tikka Pizza', description: 'Indian-style paneer pizza', price: 299, image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=300', isVeg: true },
      { category: 'Sides', name: 'Garlic Bread', description: 'Toasted bread with garlic butter', price: 99, image: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=300', isVeg: true },
      { category: 'Pasta', name: 'Penne Arrabbiata', description: 'Penne in spicy tomato sauce', price: 220, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300', isVeg: true },
      { category: 'Beverages', name: 'Cold Coffee', description: 'Chilled blended coffee', price: 99, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300', isVeg: true }
    ],
    'Burger Barn': [
      { category: 'Burgers', name: 'Aloo Tikki Burger', description: 'Crispy potato patty burger', price: 89, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300', isVeg: true },
      { category: 'Burgers', name: 'Chicken Maharaja Burger', description: 'Spicy chicken patty with lettuce', price: 149, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300', isVeg: false },
      { category: 'Burgers', name: 'Double Chicken Burger', description: 'Double patty chicken burger', price: 189, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300', isVeg: false },
      { category: 'Sides', name: 'French Fries', description: 'Crispy salted fries', price: 79, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300', isVeg: true },
      { category: 'Sides', name: 'Peri Peri Fries', description: 'Fries with peri peri seasoning', price: 99, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300', isVeg: true },
      { category: 'Beverages', name: 'Chocolate Shake', description: 'Thick chocolate milkshake', price: 99, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300', isVeg: true }
    ],
    'The Fine Plate': [
      { category: 'Starters', name: 'Grilled Prawns', description: 'Herb-marinated grilled prawns', price: 650, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300', isVeg: false },
      { category: 'Starters', name: 'Bruschetta', description: 'Toasted bread with tomato and basil', price: 320, image: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=300', isVeg: true },
      { category: 'Mains', name: 'Grilled Salmon', description: 'Atlantic salmon with lemon butter sauce', price: 850, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300', isVeg: false },
      { category: 'Mains', name: 'Mushroom Risotto', description: 'Creamy arborio rice with mushrooms', price: 580, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300', isVeg: true },
      { category: 'Desserts', name: 'Tiramisu', description: 'Classic Italian coffee dessert', price: 320, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300', isVeg: true },
      { category: 'Beverages', name: 'Fresh Lime Soda', description: 'Chilled lime soda', price: 120, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300', isVeg: true }
    ],
    'Sushi Zen': [
      { category: 'Sushi Rolls', name: 'California Roll', description: 'Crab, avocado, cucumber', price: 380, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300', isVeg: false },
      { category: 'Sushi Rolls', name: 'Spicy Tuna Roll', description: 'Tuna with spicy mayo', price: 450, image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300', isVeg: false },
      { category: 'Sushi Rolls', name: 'Veggie Roll', description: 'Cucumber, avocado, carrot', price: 320, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=300', isVeg: true },
      { category: 'Nigiri', name: 'Salmon Nigiri', description: 'Fresh salmon on seasoned rice', price: 280, image: 'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=300', isVeg: false },
      { category: 'Sides', name: 'Miso Soup', description: 'Traditional Japanese soup', price: 150, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300', isVeg: true },
      { category: 'Sides', name: 'Edamame', description: 'Steamed salted soybeans', price: 180, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300', isVeg: true }
    ],
    'Green Bowl': [
      { category: 'Salads', name: 'Caesar Salad', description: 'Romaine lettuce with caesar dressing', price: 220, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300', isVeg: true },
      { category: 'Bowls', name: 'Quinoa Power Bowl', description: 'Quinoa with roasted veggies and tahini', price: 280, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300', isVeg: true },
      { category: 'Bowls', name: 'Acai Bowl', description: 'Acai with granola and fresh fruits', price: 260, image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300', isVeg: true },
      { category: 'Wraps', name: 'Falafel Wrap', description: 'Chickpea fritters in whole wheat wrap', price: 200, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300', isVeg: true },
      { category: 'Smoothies', name: 'Green Detox Smoothie', description: 'Spinach, banana, mango blend', price: 180, image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=300', isVeg: true },
      { category: 'Smoothies', name: 'Berry Blast', description: 'Mixed berries with almond milk', price: 180, image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=300', isVeg: true }
    ],
    'Idli Wala': [
      { category: 'Idli', name: 'Plain Idli', description: 'Soft steamed rice cakes with sambar', price: 50, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300', isVeg: true },
      { category: 'Idli', name: 'Ghee Idli', description: 'Idli drizzled with pure ghee', price: 70, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300', isVeg: true },
      { category: 'Dosas', name: 'Plain Dosa', description: 'Crispy rice crepe with chutney', price: 60, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=300', isVeg: true },
      { category: 'Dosas', name: 'Onion Rava Dosa', description: 'Semolina dosa with onions', price: 90, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=300', isVeg: true },
      { category: 'Vada', name: 'Sambar Vada', description: 'Vada soaked in sambar', price: 70, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300', isVeg: true },
      { category: 'Beverages', name: 'Buttermilk', description: 'Chilled spiced buttermilk', price: 30, image: 'https://images.unsplash.com/photo-1571167366136-b57e07161714?w=300', isVeg: true }
    ],
    'Kebab King': [
      { category: 'Kebabs', name: 'Galouti Kebab', description: 'Melt-in-mouth minced meat kebab', price: 320, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300', isVeg: false },
      { category: 'Kebabs', name: 'Kakori Kebab', description: 'Soft spiced lamb kebab', price: 350, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300', isVeg: false },
      { category: 'Kebabs', name: 'Hara Bhara Kebab', description: 'Green vegetable and paneer kebab', price: 220, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300', isVeg: true },
      { category: 'Curries', name: 'Nihari', description: 'Slow-cooked meat stew', price: 380, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300', isVeg: false },
      { category: 'Breads', name: 'Sheermal', description: 'Saffron-flavored sweet bread', price: 60, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300', isVeg: true },
      { category: 'Desserts', name: 'Shahi Tukda', description: 'Fried bread with rabri', price: 120, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300', isVeg: true }
    ],
    'The Rooftop': [
      { category: 'Starters', name: 'Lobster Bisque', description: 'Creamy lobster soup', price: 750, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300', isVeg: false },
      { category: 'Starters', name: 'Burrata Salad', description: 'Fresh burrata with heirloom tomatoes', price: 580, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300', isVeg: true },
      { category: 'Mains', name: 'Lamb Rack', description: 'Herb-crusted rack of lamb', price: 1200, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300', isVeg: false },
      { category: 'Mains', name: 'Truffle Pasta', description: 'Pasta with black truffle and parmesan', price: 850, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300', isVeg: true },
      { category: 'Mains', name: 'Sea Bass', description: 'Pan-seared sea bass with capers', price: 950, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300', isVeg: false },
      { category: 'Desserts', name: 'Chocolate Fondant', description: 'Warm chocolate lava cake', price: 380, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300', isVeg: true }
    ]
  };

  const items = menus[restaurantName] || [];
  return items.map(item => ({ ...item, restaurantId }));
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});
    console.log('Cleared existing data');

    const createdRestaurants = await Restaurant.insertMany(restaurants);
    console.log(`${createdRestaurants.length} restaurants seeded`);

    const allMenuItems = [];
    createdRestaurants.forEach(restaurant => {
      const menuItems = getMenuItems(restaurant._id, restaurant.name);
      allMenuItems.push(...menuItems);
    });

    await MenuItem.insertMany(allMenuItems);
    console.log(`${allMenuItems.length} menu items seeded`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
