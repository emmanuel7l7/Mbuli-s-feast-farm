
'use client';

import type { Product } from '@/lib/types';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Check if window is defined (i.e., we're on the client side)
    if (typeof window !== 'undefined') {
      try {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
      } catch (error) {
        console.error("Error reading cart from localStorage", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    try {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
        console.error("Error saving cart to localStorage", error);
    }
  }, [cartItems]);

  const addItem = (product: Product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
