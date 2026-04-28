import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await orderAPI.getUserOrders();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Placed':
        return '#3498db';
      case 'Preparing':
        return '#f39c12';
      case 'Out for delivery':
        return '#9b59b6';
      case 'Delivered':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="no-orders">
        <h2>No orders yet</h2>
        <p>Start ordering from your favorite restaurants!</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1>Your Orders</h1>
        
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>{order.restaurantName}</h3>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
                <div className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                  {order.status}
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="order-item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                    </div>
                    <span className="item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="delivery-address">
                  <strong>Delivery Address:</strong>
                  <p>{order.deliveryAddress.addressLine}, {order.deliveryAddress.city}</p>
                  <p>{order.deliveryAddress.state} - {order.deliveryAddress.pincode}</p>
                </div>
                <div className="order-total">
                  <span>Total Amount</span>
                  <span className="total-price">₹{order.totalPrice}</span>
                </div>
              </div>

              <div className="payment-info">
                <span>💵 Payment: {order.paymentMethod}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
