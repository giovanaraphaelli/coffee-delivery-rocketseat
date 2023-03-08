import { useContext } from 'react';
import { Card } from '../../components/Card';
import { CartContext } from '../../context/CartContext';
import { coffees } from '../../data/coffee-list.json';
import styles from './styles.module.css';

export function Checkout() {
  const { cart, totalPriceItens, formatPrice, frete, totalCart } =
    useContext(CartContext);

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

      <div className={styles.resume}>
        {cart.length === 0 ? (
          <h2>Seu carrinho esta vazio.</h2>
        ) : (
          <>
            <h2>Cafés selecionados</h2>
            <div>
              {filteredCoffees.map((coffee) => {
                return (
                  <Card coffee={coffee} key={coffee.id} typeCard={'cart'} />
                );
              })}
            </div>
            <footer>
              <div>
                <p>Total de Itens</p>
                <span>R$ {formatPrice(totalPriceItens)}</span>
              </div>
              <div>
                <p>Entrega</p>
                <span>R$ {formatPrice(frete)}</span>
              </div>
              <div className={styles.total}>
                <h4>Total</h4>
                <span>R$ {formatPrice(totalCart)}</span>
              </div>
              <button type="submit">Confirmar pedido</button>
            </footer>
          </>
        )}
      </div>
    </main>
  );
}
