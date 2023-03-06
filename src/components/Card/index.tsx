import { Minus, Plus, ShoppingCart } from 'phosphor-react';
import styles from './styles.module.css';

interface Coffee {
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
          R$ <span>{coffee.price}</span>
        </p>
        <div>
          <div className={styles.counter}>
            <button>
              <Minus size={14} weight="fill" />
            </button>
            1
            <button>
              <Plus size={14} weight="fill" />
            </button>
          </div>
          <button>
            <ShoppingCart size={20} weight="fill" color="#fff" />
          </button>
        </div>
      </form>
    </div>
  );
}
