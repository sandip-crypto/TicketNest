import React, { createContext, useState, useContext } from "react";

// Create a context for the cart
const CartContext = createContext();

// CartProvider component to wrap around your app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Cart will hold the list of tickets
  const [totalPrice, setTotalPrice] = useState(0); // To track the total price of the tickets

  // Add an item to the cart (movie, event, or sport)
  const addItem = (item, quantity, price) => {
    const newItem = {
      id: item.id,
      type: item.type, // type: 'movie', 'event', or 'sport'
      name: item.name,
      quantity,
      price,
      total: price * quantity,
      details: item.details, // Additional details based on item type (screening time, venue, etc.)
    };

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.type === item.type
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        updatedCart[existingItemIndex].total =
          updatedCart[existingItemIndex].quantity *
          updatedCart[existingItemIndex].price;
        return updatedCart;
      } else {
        return [...prevCart, newItem];
      }
    });
  };

  // Remove an item from the cart
  const removeItem = (itemId, itemType) => {
    setCart((prevCart) => {
      return prevCart.filter(
        (cartItem) => cartItem.id !== itemId || cartItem.type !== itemType
      );
    });
  };

  // Update the quantity of an item
  const updateItemQuantity = (itemId, itemType, quantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((cartItem) =>
        cartItem.id === itemId && cartItem.type === itemType
          ? { ...cartItem, quantity, total: cartItem.price * quantity }
          : cartItem
      );
      return updatedCart;
    });
  };

  // Recalculate the total price of the cart
  const calculateTotalPrice = () => {
    const total = cart.reduce((acc, cartItem) => acc + cartItem.total, 0);
    setTotalPrice(total);
  };

  // Calculate total price whenever the cart changes
  React.useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, totalPrice, addItem, removeItem, updateItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context
export const useCart = () => {
  return useContext(CartContext);
};
