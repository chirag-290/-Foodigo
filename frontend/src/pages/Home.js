import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { restaurantAPI } from '../services/api';
import './Home.css';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    cuisine: '',
    rating: '',
    isVeg: false,
    priceRange: '',
    sortBy: ''
  });

  const cuisines = ['Italian', 'American', 'Japanese', 'Indian', 'Mexican', 'Healthy', 'Vegan', 'Chinese', 'Street Food', 'Biryani', 'South Indian', 'North Indian'];
  const priceRanges = ['Under ₹200', '₹200-₹500', '₹500+'];

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, restaurants]);

  const fetchRestaurants = async () => {
    try {
      const { data } = await restaurantAPI.getAll();
      setRestaurants(data);
      setFilteredRestaurants(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...restaurants];

    if (filters.cuisine) {
      result = result.filter(r => r.cuisine.includes(filters.cuisine));
    }

    if (filters.rating) {
      result = result.filter(r => r.rating >= parseFloat(filters.rating));
    }

    if (filters.isVeg) {
      result = result.filter(r => r.isVeg === true);
    }

    if (filters.priceRange) {
      result = result.filter(r => r.priceRange === filters.priceRange);
    }

    if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'deliveryTime') {
      result.sort((a, b) => a.deliveryTime - b.deliveryTime);
    } else if (filters.sortBy === 'priceRange') {
      result.sort((a, b) => a.priceRange.length - b.priceRange.length);
    }

    setFilteredRestaurants(result);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      cuisine: '',
      rating: '',
      isVeg: false,
      priceRange: '',
      sortBy: ''
    });
  };

  if (loading) {
    return <div className="loading">Loading restaurants...</div>;
  }

  return (
    <div className="home">
      <div className="home-container">
        <div className="filters-section">
          <h2>Filters</h2>
          
          <div className="filter-group">
            <label>Cuisine</label>
            <select value={filters.cuisine} onChange={(e) => handleFilterChange('cuisine', e.target.value)}>
              <option value="">All Cuisines</option>
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Minimum Rating</label>
            <select value={filters.rating} onChange={(e) => handleFilterChange('rating', e.target.value)}>
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <select value={filters.priceRange} onChange={(e) => handleFilterChange('priceRange', e.target.value)}>
              <option value="">Any Price</option>
              {priceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          <div className="filter-group checkbox-group">
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
            <label>Sort By</label>
            <select value={filters.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value)}>
              <option value="">Default</option>
              <option value="rating">Rating</option>
              <option value="deliveryTime">Delivery Time</option>
              <option value="priceRange">Price</option>
            </select>
          </div>

          <button className="clear-filters-btn" onClick={clearFilters}>Clear Filters</button>
        </div>

        <div className="restaurants-section">
          <h1>Restaurants Near You</h1>
          <p className="results-count">{filteredRestaurants.length} restaurants found</p>
          
          <div className="restaurants-grid">
            {filteredRestaurants.map(restaurant => (
              <Link to={`/restaurant/${restaurant._id}`} key={restaurant._id} className="restaurant-card">
                <img src={restaurant.image} alt={restaurant.name} />
                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>
                  <p className="cuisine">{restaurant.cuisine.join(', ')}</p>
                  <div className="restaurant-meta">
                    <span className="rating">⭐ {restaurant.rating}</span>
                    <span className="delivery-time">🕒 {restaurant.deliveryTime} min</span>
                    <span className="price-range">{restaurant.priceRange}</span>
                  </div>
                  {restaurant.isVeg && <span className="veg-badge">🌱 Pure Veg</span>}
                </div>
              </Link>
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="no-results">
              <p>No restaurants found matching your filters.</p>
              <button onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
