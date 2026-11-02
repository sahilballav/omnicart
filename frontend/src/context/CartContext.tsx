import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CartState } from '../types/product';

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number, selectedAttributes?: Record<string, string>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void;
}

const CART_STORAGE_KEY = 'omnicart_session_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist cart:', e);
    }
  }, [items]);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const estimatedShipping = subtotal > 150 || items.length === 0 ? 0 : 15.0;
  const estimatedTax = subtotal * 0.0825; // standard 8.25%
  const total = subtotal + estimatedShipping + estimatedTax;

  const addToCart = (product: Product, quantity = 1, selectedAttributes?: Record<string, string>) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = Math.min(next[existingIndex].quantity + quantity, product.inventoryCount);
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: newQty,
          selectedAttributes: selectedAttributes || next[existingIndex].selectedAttributes
        };
        return next;
      }
      return [...prev, { product, quantity: Math.min(quantity, product.inventoryCount), selectedAttributes }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const clamped = Math.min(quantity, item.product.inventoryCount);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleCart = (open?: boolean) => {
    setIsOpen((prev) => (open !== undefined ? open : !prev));
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        totalQuantity,
        subtotal,
        estimatedTax,
        estimatedShipping,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
