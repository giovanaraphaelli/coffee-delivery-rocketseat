import { createContext, ReactNode, useState } from 'react';

interface CartItem {
  id: string;
  count: number;
}

interface CartContextType {
  cart: CartItem[];
  setCart: any;
  handleAddToCart: (id: string, count: number) => void;
}

interface ProviderProps {
  children: ReactNode;
}

// Criação do contexto
export const CartContext = createContext({} as CartContextType);

// Componente que fornece o contexto
export const CartProvider = ({ children }: ProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  function handleAddToCart(id: string, count: number) {
    const newCartItem: CartItem = { id, count };
    setCart([...cart, newCartItem]);
  }

  return (
    <CartContext.Provider value={{ cart, setCart, handleAddToCart }}>
      {children}
    </CartContext.Provider>
  );
};
