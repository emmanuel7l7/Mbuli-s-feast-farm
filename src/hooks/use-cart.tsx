'use client';

import type { Product, CartItem } from '@/lib/types';
import { db } from '@/lib/db';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartContextType {
  cartItems: CartItem[];
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  updateItemQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
  cartTotal: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart from IndexedDB
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const cartData = await db.cart.toArray();
      const items: CartItem[] = [];
      
      for (const cartItem of cartData) {
        const product = await db.products.get(cartItem.productId);
        if (product) {
          items.push({
            ...product,
            quantity: cartItem.quantity
          });
        }
      }
      
      setCartItems(items);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (product: Product, quantity = 1) => {
    try {
      if (!product.id) return;
      
      const existingCartItem = await db.cart.where('productId').equals(product.id).first();
      
      if (existingCartItem) {
        await db.cart.update(existingCartItem.id!, { 
          quantity: existingCartItem.quantity + quantity 
        });
      } else {
        await db.cart.add({
          productId: product.id,
          quantity,
          addedAt: new Date()
        });
      }
      
      await loadCart();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeItem = async (productId: number) => {
    try {
      await db.cart.where('productId').equals(productId).delete();
      await loadCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateItemQuantity = async (productId: number, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeItem(productId);
        return;
      }
      
      await db.cart.where('productId').equals(productId).modify({ quantity });
      await loadCart();
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      await db.cart.clear();
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
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
        loading,
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