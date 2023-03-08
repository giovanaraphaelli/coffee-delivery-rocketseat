import { ShoppingCart } from 'phosphor-react';
import { useContext } from 'react';
import { Banner } from '../../components/Banner';
import { Card } from '../../components/Card';
import { CartContext } from '../../context/CartContext';
import { coffees } from '../../data/coffee-list.json';
import styles from './styles.module.css';

export function Home() {
  const { showAlert } = useContext(CartContext);
  return (
    <>
      <Banner />
      <main className={styles.containerHome}>
        <h2>Nossos cafés</h2>
        <div className={styles.wrapperCards}>
          {coffees.map((coffee) => (
            <Card coffee={coffee} key={coffee.id} typeCard={'catalog'} />
          ))}
        </div>
        {showAlert && (
          <div className={styles.alert}>
            <ShoppingCart size={26} weight="fill" color="#ffff" />
            Item adicionado ao carrinho!
          </div>
        )}
      </main>
    </>
  );
}
