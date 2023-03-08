import { createContext, ReactNode, useEffect, useState } from 'react';

interface CartItem {
  id: string;
  amount: number;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  handleAddToCart: (id: string, amount: number, price: number) => void;
  handleRemoveFromCart: (id: string) => void;
  incrementCount: (id: string) => void;
  decrementCount: (id: string) => void;
  totalAmount: number;
  totalItens: number;
  formatPrice: (price: number) => string;
  frete: number;
  totalCart: number;
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

  function findCoffeeById(id: string): number {
    return cart.findIndex((item) => item.id === id);
  }

  function handleAddToCart(id: string, amount: number, price: number) {
    const itemIndex = findCoffeeById(id);
    if (itemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].amount += amount;
      setCart(updatedCart);
    } else {
      const newCartItem: CartItem = { id, price, amount };
      setCart([...cart, newCartItem]);
    }
  }

  function handleRemoveFromCart(id: string) {
    const itemIndex = findCoffeeById(id);
    if (itemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart.splice(itemIndex, 1);
      setCart(updatedCart);
    }
  }

  function incrementCount(id: string) {
    const itemIndex = findCoffeeById(id);
    if (itemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].amount += 1;
      setCart(updatedCart);
    }
  }

  function decrementCount(id: string) {
    const itemIndex = findCoffeeById(id);
    if (itemIndex >= 0 && cart[itemIndex].amount > 1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].amount -= 1;
      setCart(updatedCart);
    }
  }

  function formatPrice(price: number): string {
    return price.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  let totalAmount = cart.reduce((total, item) => total + item.amount, 0);

  let totalItens = cart.reduce((total, item) => item.price * totalAmount, 0);

  let frete = 3.5;

  let totalCart = totalItens + frete;

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        incrementCount,
        decrementCount,
        handleRemoveFromCart,
        totalAmount,
        totalItens,
        formatPrice,
        frete,
        totalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
