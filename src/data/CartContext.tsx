import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Flower} from './flowers';

interface CartItem {
  flower: Flower;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (flower: Flower) => void;
  removeFromCart: (flowerId: string) => void;
  updateQuantity: (flowerId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({children}: {children: ReactNode}) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (flower: Flower) => {
    setItems(prev => {
      const existing = prev.find(item => item.flower.id === flower.id);
      if (existing) {
        return prev.map(item =>
          item.flower.id === flower.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      }
      return [...prev, {flower, quantity: 1}];
    });
  };

  const removeFromCart = (flowerId: string) => {
    setItems(prev => prev.filter(item => item.flower.id !== flowerId));
  };

  const updateQuantity = (flowerId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(flowerId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.flower.id === flowerId ? {...item, quantity} : item,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.flower.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
