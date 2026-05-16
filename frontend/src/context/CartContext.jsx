import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { CART_STORAGE_KEY } from '../utils/storage';

const CartContext = createContext(null);

const readStoredCart = () => {
  try {
    const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);
    return rawCart ? JSON.parse(rawCart) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => readStoredCart());

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (food, quantity = 1) => {
    const existingItem = items.find((item) => item.foodItem === food._id);
    const nextQuantity = (existingItem?.quantity || 0) + quantity;

    if (nextQuantity > food.stock) {
      toast.error(`Only ${food.stock} portions of ${food.name} are available.`);
      return;
    }

    setItems((currentItems) => {
      if (existingItem) {
        return currentItems.map((item) =>
          item.foodItem === food._id ? { ...item, quantity: nextQuantity } : item,
        );
      }

      return [
        ...currentItems,
        {
          foodItem: food._id,
          name: food.name,
          image: food.image,
          price: food.price,
          quantity,
          stock: food.stock,
          category: food.category?.name || '',
        },
      ];
    });

    toast.success(`${food.name} added to cart.`);
  };

  const updateQuantity = (foodItemId, quantity) => {
    if (quantity < 1) {
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.foodItem !== foodItemId) {
          return item;
        }

        if (quantity > item.stock) {
          toast.error(`Only ${item.stock} portions of ${item.name} are available.`);
          return item;
        }

        return { ...item, quantity };
      }),
    );
  };

  const removeFromCart = (foodItemId) => {
    setItems((currentItems) => currentItems.filter((item) => item.foodItem !== foodItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? 49 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        deliveryFee,
        tax,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
