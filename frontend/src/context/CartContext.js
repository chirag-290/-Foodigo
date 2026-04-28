import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedRestaurant = localStorage.getItem('restaurant');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    if (storedRestaurant) {
      setRestaurant(JSON.parse(storedRestaurant));
    }
  }, []);

  const addToCart = (item, restaurantInfo) => {
    if (restaurant && restaurant._id !== restaurantInfo._id) {
      const confirm = window.confirm('Your cart contains items from another restaurant. Do you want to clear it?');
      if (!confirm) return;
      setCart([]);
    }

    setRestaurant(restaurantInfo);
    localStorage.setItem('restaurant', JSON.stringify(restaurantInfo));

    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    
    let newCart;
    if (existingItem) {
      newCart = cart.map(cartItem =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (itemId) => {
    const newCart = cart.filter(item => item._id !== itemId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    if (newCart.length === 0) {
      setRestaurant(null);
      localStorage.removeItem('restaurant');
    }
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const newCart = cart.map(item =>
      item._id === itemId ? { ...item, quantity } : item
    );
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    setRestaurant(null);
    localStorage.removeItem('cart');
    localStorage.removeItem('restaurant');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      restaurant,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};
