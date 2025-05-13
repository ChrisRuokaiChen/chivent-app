import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const storageKey = user ? null : 'guest_cart';
  const [items, setItems] = useState([]);

  // Load from server or localStorage
  useEffect(() => {
    if (user) {
      axios.get('/api/cart').then(r => setItems(r.data));
    } else {
      const raw = localStorage.getItem(storageKey);
      setItems(raw ? JSON.parse(raw) : []);
    }
  }, [user]);

  // Persist guest cart
  useEffect(() => {
    if (!user) localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, user]);

  // Add item
  const addToCart = async (ev, qty = 1) => {
    if (user) {
      const { data } = await axios.post('/api/cart', { eventId: ev._id || ev.id, qty });
      setItems(data);
    } else {
      setItems(prev => {
        if (prev.some(i => i.id === ev.id)) return prev;
        return [...prev, { ...ev, qty }];
      });
    }
  };

  // Update quantity
  const updateQty = async (id, qty) => {
    if (user) {
      const { data } = await axios.patch(`/api/cart/${id}`, { qty });
      setItems(data);
    } else {
      setItems(prev => prev.map(i => (i.id === id ? { ...i, qty } : i)));
    }
  };

  // Remove item
  const removeFromCart = async (id) => {
    if (user) {
      const { data } = await axios.delete(`/api/cart/${id}`);
      setItems(data);
    } else {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  // Checkout → create order and clear cart
  const checkout = async () => {
    if (!user) return null;
    const payload = items.map(i => ({
      event: i.event?._id || i.id,
      qty:   i.qty
    }));
    const { data } = await axios.post('/api/orders', { items: payload });
    setItems([]);  // clear UI
    return data;   
  };

  // Subtotal total
  const total = items.reduce((sum, i) => {
    const price = i.price ?? i.event?.price ?? 0;
    const qty   = i.qty ?? 1;
    return sum + price * qty;
  }, 0);

  return (
    <CartContext.Provider value={{
      items, addToCart, updateQty, removeFromCart, total, checkout
    }}>
      {children}
    </CartContext.Provider>
  );
}
