import { useContext } from 'react';
import { Card } from '../../components/Card';
import { CartContext } from '../../context/CartContext';
import { coffees } from '../../data/coffee-list.json';
import styles from './styles.module.css';

export function Checkout() {
  const { cart } = useContext(CartContext);

  const filteredCoffees = coffees.filter((coffee) =>
    cart.some((item) => item.id === coffee.id)
  );

  return (
    <main className={styles.containerCheckout}>
      <div>
        <h2>Complete seu pedido</h2>
        <form>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit
          necessitatibus quaerat temporibus doloribus repellat, dolores facilis,
          natus saepe quia ex, voluptas corrupti? Nobis error id, atque dolor
          nihil tenetur inventore.
        </form>
      </div>
      <div>
        <h2>Cafés selecionados</h2>
        <div className={styles.resume}>
          {filteredCoffees.map((coffee) => {
            return <Card coffee={coffee} key={coffee.id} typeCard={'cart'} />;
          })}
        </div>
      </div>
    </main>
  );
}
