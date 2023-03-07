import { Minus, Plus, ShoppingCart, Trash } from 'phosphor-react';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
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
    incrementCount,
    decrementCount,
    handleRemoveFromCart,
  } = useContext(CartContext);

  const existingCartItem = useContext(CartContext).cart.find(
    (item) => item.id === coffee.id
  );
  const [count, setCount] = useState<number>(
    existingCartItem ? existingCartItem.count : 1
  );

  function handleIncrement() {
    setCount(count + 1);
    incrementCount(coffee.id);
  }

  function handleDecrement() {
    if (count > 1) {
      setCount(count - 1);
      decrementCount(coffee.id);
    }
  }

  function formatPrice(price: number, count: number): string {
    const total = price * count;
    return total.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <>
      {typeCard === 'catalog' ? (
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
              R$<span> {formatPrice(coffee.price, count)}</span>
            </p>
            <div>
              <div className={styles.counter}>
                <button type="button" onClick={handleDecrement}>
                  <Minus size={14} weight="fill" />
                </button>
                <span>{count}</span>
                <button type="button" onClick={handleIncrement}>
                  <Plus size={14} weight="fill" />
                </button>
              </div>
              <button
                className={styles.btnCart}
                type="button"
                onClick={() => {
                  handleAddToCart(coffee.id, count);
                }}
              >
                <ShoppingCart size={20} weight="fill" color="#fff" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.cardCart}>
          <img src={coffee.image} alt={coffee.image} />
          <div>
            <h3>{coffee.name}</h3>
            <div className={styles.wrapperActions}>
              <div className={styles.counter}>
                <button type="button" onClick={handleDecrement}>
                  <Minus size={14} weight="fill" />
                </button>
                <span>{count}</span>
                <button type="button" onClick={handleIncrement}>
                  <Plus size={14} weight="fill" />
                </button>
              </div>

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
            R$<span> {formatPrice(coffee.price, count)}</span>
          </p>
        </div>
      )}
    </>
  );
}
