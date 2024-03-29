import { Minus, Plus, ShoppingCart, Trash } from 'phosphor-react';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { Counter } from '../Counter';
import styles from './styles.module.css';

interface Coffee {
  id: string;
  image: string;
  name: string;
  tags: string[];
  description: string;
  price: number;
}

interface CardProps {
  coffee: Coffee;
  typeCard: 'cart' | 'catalog';
}

export function Card({ coffee, typeCard }: CardProps) {
  const {
    handleAddToCart,
    incrementAmount,
    decrementAmount,
    handleRemoveFromCart,
    cart,
    formatPrice,
    totalPriceEachItem,
  } = useContext(CartContext);

  const existingCartItem = cart.find((item) => item.id === coffee.id);
  const [amount, setAmount] = useState<number>(
    existingCartItem ? existingCartItem.amount : 1
  );

  function handleIncrement() {
    setAmount(amount + 1);
    incrementAmount(coffee.id);
  }

  function handleDecrement() {
    if (amount > 1) {
      setAmount(amount - 1);
      decrementAmount(coffee.id);
    }
  }

  return (
    <>
      {typeCard === 'catalog' && (
        <div className={styles.cardCatalog}>
          <img src={coffee.image} alt={coffee.name} />
          <div className={styles.wrapperTags}>
            {coffee.tags.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </div>
          <h3>{coffee.name}</h3>
          <p>{coffee.description}</p>
          <form>
            <p>
              R$
              <span className={styles.price}>
                {' '}
                {formatPrice(totalPriceEachItem(coffee.price, amount))}
              </span>
            </p>
            <div>
              <Counter
                amount={amount}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
              />
              <button
                className={styles.btnCart}
                type="button"
                onClick={() => {
                  handleAddToCart(coffee.id, amount, coffee.price);
                }}
              >
                <ShoppingCart size={20} weight="fill" color="#fff" />
              </button>
            </div>
          </form>
        </div>
      )}

      {typeCard === 'cart' && (
        <div className={styles.cardCart}>
          <img src={coffee.image} alt={coffee.image} />
          <div>
            <h3>{coffee.name}</h3>
            <div className={styles.wrapperActions}>
              <Counter
                amount={amount}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
              />
              <button
                type="button"
                onClick={() => handleRemoveFromCart(coffee.id)}
              >
                <Trash size={16} color="#8047F8" />
                Remover
              </button>
            </div>
          </div>
          <p>
            R$
            <span>
              {' '}
              {formatPrice(totalPriceEachItem(coffee.price, amount))}
            </span>
          </p>
        </div>
      )}
    </>
  );
}
