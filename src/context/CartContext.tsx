import { createContext, ReactNode, useEffect, useState } from 'react';

interface CartItem {
  id: string;
  amount: number;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  totalAmount: number;
  totalPriceItens: number;
  frete: number;
  totalCart: number;
  showAlert: boolean;
  handleAddToCart: (id: string, amount: number, price: number) => void;
  handleRemoveFromCart: (id: string) => void;
  incrementAmount: (id: string) => void;
  decrementAmount: (id: string) => void;
  totalPriceCoffee: (price: number, count: number) => number;
  formatPrice: (price: number) => string;
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

  const [showAlert, setShowAlert] = useState(false);

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
    showTooltipTemporarily();
  }

  function handleRemoveFromCart(id: string) {
    const itemIndex = findCoffeeById(id);
    if (itemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart.splice(itemIndex, 1);
      setCart(updatedCart);
    }
  }

  function incrementAmount(id: string) {
    const itemIndex = findCoffeeById(id);
    if (itemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].amount += 1;
      setCart(updatedCart);
    }
  }

  function decrementAmount(id: string) {
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

  function totalPriceCoffee(price: number, count: number) {
    return price * count;
  }

  let totalAmount = cart.reduce((total, item) => total + item.amount, 0);

  let totalPriceItens = cart.reduce((_, item) => item.price * totalAmount, 0);

  let frete = 3.5;

  let totalCart = totalPriceItens + frete;

  function showTooltipTemporarily() {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleRemoveFromCart,
        incrementAmount,
        decrementAmount,
        totalPriceCoffee,
        formatPrice,
        totalAmount,
        totalPriceItens,
        frete,
        totalCart,
        showAlert,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
