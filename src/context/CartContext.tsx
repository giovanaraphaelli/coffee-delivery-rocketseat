import { createContext, ReactNode, useEffect, useState } from 'react';

interface CartItem {
  id: string;
  count: number;
}

interface CartContextType {
  cart: CartItem[];
  handleAddToCart: (id: string, count: number) => void;
  handleRemoveFromCart: (id: string) => void;
  incrementCount: (id: string) => void;
  decrementCount: (id: string) => void;
}

interface ProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }: ProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      return JSON.parse(storedCart);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function findCartItemIndexById(id: string): number {
    return cart.findIndex((item) => item.id === id);
  }

  function handleAddToCart(id: string, count: number) {
    const itemIndex = findCartItemIndexById(id);
    if (itemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].count += count;
      setCart(updatedCart);
    } else {
      const newCartItem: CartItem = { id, count };
      setCart([...cart, newCartItem]);
    }
  }

  function handleRemoveFromCart(id: string) {
    const itemIndex = findCartItemIndexById(id);
    if (itemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart.splice(itemIndex, 1);
      setCart(updatedCart);
    }
  }

  function incrementCount(id: string) {
    const itemIndex = findCartItemIndexById(id);
    if (itemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].count += 1;
      setCart(updatedCart);
    }
  }

  function decrementCount(id: string) {
    const itemIndex = findCartItemIndexById(id);
    if (itemIndex >= 0 && cart[itemIndex].count > 1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].count -= 1;
      setCart(updatedCart);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        incrementCount,
        decrementCount,
        handleRemoveFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
