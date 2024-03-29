import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Card';
import { CartContext } from '../../context/CartContext';
import { coffees } from '../../data/coffee-list.json';
import styles from './styles.module.css';

export function Checkout() {
  const { cart, totalPriceCartItens, formatPrice, frete, totalPriceCart } =
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
          <div className={styles.resumeEmpty}>
            <h2>Seu carrinho está vazio.</h2>
            <Link to="/">Continuar comprando</Link>
          </div>
        ) : (
          <div>
            <h2>Cafés selecionados</h2>
            <div className={styles.wrapperResume}>
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
                  <span>R$ {formatPrice(totalPriceCartItens)}</span>
                </div>
                <div>
                  <p>Entrega</p>
                  <span>R$ {formatPrice(frete)}</span>
                </div>
                <div className={styles.total}>
                  <h4>Total</h4>
                  <span>R$ {formatPrice(totalPriceCart)}</span>
                </div>
                <button type="submit">Confirmar pedido</button>
              </footer>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
