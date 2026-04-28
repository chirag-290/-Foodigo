import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { restaurantAPI, menuAPI } from '../services/api';
import { CartContext } from '../context/CartContext';
import Toast from '../components/Toast';
import './RestaurantDetails.css';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    isVeg: false,
    minPrice: '',
    maxPrice: ''
  });
  const [toast, setToast] = useState(null);
  const { addToCart } = useContext(CartContext);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  useEffect(() => {
    fetchRestaurantDetails();
    fetchMenu();
  }, [id]);

  const fetchRestaurantDetails = async () => {
    try {
      const { data } = await restaurantAPI.getById(id);
      setRestaurant(data);
    } catch (error) {
      console.error('Error fetching restaurant:', error);
    }
  };

  const fetchMenu = async () => {
    try {
      const { data } = await menuAPI.getByRestaurant(id, filters);
      setMenu(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    if (restaurant) {
      addToCart(item, restaurant);
      showToast(`${item.name} added to cart!`, 'success');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    fetchMenu();
  };

  if (loading || !restaurant) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="restaurant-details">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="restaurant-header">
        <img src={restaurant.image} alt={restaurant.name} />
        <div className="restaurant-header-info">
          <h1>{restaurant.name}</h1>
          <p className="cuisine">{restaurant.cuisine.join(', ')}</p>
          <div className="restaurant-meta">
            <span className="rating">⭐ {restaurant.rating}</span>
            <span className="delivery-time">🕒 {restaurant.deliveryTime} min</span>
            <span className="price-range">{restaurant.priceRange}</span>
            <span className="location">📍 {restaurant.location}</span>
          </div>
          {restaurant.isVeg && <span className="veg-badge">🌱 Pure Veg</span>}
        </div>
      </div>

      <div className="menu-container">
        <div className="menu-filters">
          <h3>Filter Menu</h3>
          
          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                checked={filters.isVeg}
                onChange={(e) => handleFilterChange('isVeg', e.target.checked)}
              />
              Vegetarian Only
            </label>
          </div>

          <div className="filter-group">
            <label>Min Price (₹)</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="filter-group">
            <label>Max Price (₹)</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              placeholder="1000"
            />
          </div>

          <button className="apply-filters-btn" onClick={applyFilters}>Apply Filters</button>
        </div>

        <div className="menu-section">
          <h2>Menu</h2>
          
          {Object.keys(menu).length === 0 ? (
            <p className="no-items">No menu items found.</p>
          ) : (
            Object.keys(menu).map(category => (
              <div key={category} className="menu-category">
                <h3>{category}</h3>
                <div className="menu-items">
                  {menu[category].map(item => (
                    <div key={item._id} className="menu-item">
                      <img src={item.image} alt={item.name} />
                      <div className="menu-item-info">
                        <div className="menu-item-header">
                          <h4>{item.name}</h4>
                          {item.isVeg ? (
                            <span className="veg-icon">🟢</span>
                          ) : (
                            <span className="non-veg-icon">🔴</span>
                          )}
                        </div>
                        <p className="description">{item.description}</p>
                        <div className="menu-item-footer">
                          <span className="price">₹{item.price}</span>
                          <button 
                            className="add-btn"
                            onClick={() => handleAddToCart(item)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
