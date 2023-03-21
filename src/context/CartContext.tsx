import { createContext, ReactNode, useEffect, useState } from 'react';

interface CartItem {
  id: string;
  amount: number;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  totalAmountCartItens: number;
  totalPriceCartItens: number;
  frete: number;
  totalPriceCart: number;
  showAlert: boolean;
  handleAddToCart: (id: string, amount: number, price: number) => void;
  handleRemoveFromCart: (id: string) => void;
  incrementAmount: (id: string) => void;
  decrementAmount: (id: string) => void;
  totalPriceEachItem: (price: number, count: number) => number;
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

  function showAlertTemporarily() {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
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
    showAlertTemporarily();
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

  function totalPriceEachItem(price: number, count: number) {
    return price * count;
  }

  let totalAmountCartItens = cart.reduce(
    (total, item) => total + item.amount,
    0
  );

  let totalPriceCartItens = cart.reduce(
    (_, item) => item.price * totalAmountCartItens,
    0
  );

  let frete = 3.5;

  let totalPriceCart = totalPriceCartItens + frete;

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleRemoveFromCart,
        incrementAmount,
        decrementAmount,
        totalPriceEachItem,
        formatPrice,
        totalAmountCartItens,
        totalPriceCartItens,
        frete,
        totalPriceCart,
        showAlert,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
