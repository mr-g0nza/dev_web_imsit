"use client";

import type { CartItem, Wheel } from "@/lib/types";
import { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (wheel: Wheel) => void;
  removeFromCart: (wheelId: string) => void;
  updateQuantity: (wheelId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (wheel: Wheel) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.wheel.id === wheel.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.wheel.id === wheel.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { wheel, quantity: 1 }];
    });
    toast({
      title: "Добавлено в корзину",
      description: `${wheel.name} был добавлен в вашу корзину.`,
    });
  };

  const removeFromCart = (wheelId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.wheel.id !== wheelId)
    );
    toast({
      title: "Удалено из корзины",
      description: `Товар был удален из вашей корзины.`,
      variant: "destructive",
    });
  };

  const updateQuantity = (wheelId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(wheelId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.wheel.id === wheelId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.wheel.price * item.quantity,
    0
  );
  
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
