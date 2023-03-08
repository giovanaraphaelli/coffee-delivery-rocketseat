import { Minus, Plus } from 'phosphor-react';
import styles from './styles.module.css';

interface CounterProps {
  amount: number;
  handleDecrement: () => void;
  handleIncrement: () => void;
}

export function Counter({
  handleDecrement,
  handleIncrement,
  amount,
}: CounterProps) {
  return (
    <div className={styles.counter}>
      <button type="button" onClick={handleDecrement}>
        <Minus size={14} weight="fill" />
      </button>
      <span>{amount}</span>
      <button type="button" onClick={handleIncrement}>
        <Plus size={14} weight="fill" />
      </button>
    </div>
  );
}
