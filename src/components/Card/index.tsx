import { Minus, Plus, ShoppingCart } from 'phosphor-react';
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
}

export function Card({ coffee }: CardProps) {
  const [count, setCount] = useState<number>(1);
  const { handleAddToCart } = useContext(CartContext);

  function handleIncrement() {
    setCount(count + 1);
  }

  function handleDecrement() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  function formatPrice(price: number, count: number): string {
    const total = price * count;
    return total.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function handleAddToCartClick() {
    handleAddToCart(coffee.id, count);
  }

  return (
    <div className={styles.card}>
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
          <button type="button" onClick={handleAddToCartClick}>
            <ShoppingCart size={20} weight="fill" color="#fff" />
          </button>
        </div>
      </form>
    </div>
  );
}
