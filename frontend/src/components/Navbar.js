import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getTotalItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🍽️ Foodigo
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>
          
          {user ? (
            <>
              <Link to="/orders" className="navbar-link">Orders</Link>
              <Link to="/cart" className="navbar-link cart-link">
                Cart {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
              </Link>
              <span className="navbar-user">Hi, {user.name}</span>
              <button onClick={handleLogout} className="navbar-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-btn">Login</Link>
              <Link to="/signup" className="navbar-btn signup-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
