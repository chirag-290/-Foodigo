import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { orderAPI, userAPI } from '../services/api';
import Toast from '../components/Toast';
import './Cart.css';

const Cart = () => {
  const { cart, restaurant, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useContext(CartContext);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
    location: ''
  });
  const navigate = useNavigate();

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    setToast({ message, type, duration });
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const { data } = await userAPI.getAddresses();
      setAddresses(data);
      if (data.length > 0) {
        setSelectedAddress(data[0]);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const { data } = await userAPI.addAddress(newAddress);
      setAddresses(data);
      setSelectedAddress(data[data.length - 1]);
      setShowAddressForm(false);
      setNewAddress({ label: '', addressLine: '', city: '', state: '', pincode: '', location: '' });
      showToast('Address saved successfully!', 'success');
    } catch (error) {
      showToast('Error adding address: ' + error.response?.data?.message, 'error');
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      showToast('Please select a delivery address', 'warning');
      return;
    }

    if (cart.length === 0) {
      showToast('Your cart is empty', 'warning');
      return;
    }

    try {
      const orderData = {
        restaurantId: restaurant._id,
        restaurantName: restaurant.name,
        items: cart.map(item => ({
          menuItemId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalPrice: getTotalPrice(),
        deliveryAddress: selectedAddress
      };

      await orderAPI.create(orderData);
      setOrderPlaced(true);
      showToast('Order placed successfully! 🎉 Redirecting to orders...', 'success', 2500);
      setTimeout(() => {
        clearCart();
        navigate('/orders');
      }, 1500);
    } catch (error) {
      showToast('Error placing order: ' + error.response?.data?.message, 'error');
    }
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add items from restaurants to get started</p>
        <button onClick={() => navigate('/')}>Browse Restaurants</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {toast && <Toast message={toast.message} type={toast.type} duration={toast.duration || 3000} onClose={() => setToast(null)} />}
      <div className="cart-container">
        <div className="cart-items-section">
          <h2>Your Cart</h2>
          {restaurant && (
            <div className="cart-restaurant">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.location}</p>
            </div>
          )}

          <div className="cart-items">
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">₹{item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-summary-section">
          <div className="delivery-address">
            <h3>Delivery Address</h3>
            
            {addresses.length > 0 && (
              <div className="address-list">
                {addresses.map(address => (
                  <div 
                    key={address._id} 
                    className={`address-item ${selectedAddress?._id === address._id ? 'selected' : ''}`}
                    onClick={() => setSelectedAddress(address)}
                  >
                    <input 
                      type="radio" 
                      checked={selectedAddress?._id === address._id}
                      onChange={() => setSelectedAddress(address)}
                    />
                    <div>
                      <strong>{address.label}</strong>
                      <p>{address.addressLine}, {address.city}, {address.state} - {address.pincode}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!showAddressForm ? (
              <button className="add-address-btn" onClick={() => setShowAddressForm(true)}>
                + Add New Address
              </button>
            ) : (
              <form className="address-form" onSubmit={handleAddAddress}>
                <input
                  type="text"
                  placeholder="Label (Home, Work, etc.)"
                  value={newAddress.label}
                  onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Address Line"
                  value={newAddress.addressLine}
                  onChange={(e) => setNewAddress({...newAddress, addressLine: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={newAddress.pincode}
                  onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Location/Landmark"
                  value={newAddress.location}
                  onChange={(e) => setNewAddress({...newAddress, location: e.target.value})}
                />
                <div className="form-actions">
                  <button type="submit">Save Address</button>
                  <button type="button" onClick={() => setShowAddressForm(false)}>Cancel</button>
                </div>
              </form>
            )}
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{getTotalPrice()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹49</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{getTotalPrice() + 49}</span>
            </div>
            <div className="payment-method">
              <p>💵 Payment Method: Cash on Delivery (COD)</p>
            </div>
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
