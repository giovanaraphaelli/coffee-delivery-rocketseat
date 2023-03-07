import styles from './styles.module.css';
import CoffeeBanner from '../../assets/coffee-banner.png';
import { Coffee, Cube, ShoppingCart, Timer } from 'phosphor-react';

export function Banner() {
  return (
    <div className={styles.banner}>
      <div>
        <h1>Encontre o café perfeito para qualquer hora do dia</h1>
        <p>
          Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
          hora
        </p>
        <div className={styles.wrapperItens}>
          <div>
            <div>
              <ShoppingCart size={16} weight="fill" />
            </div>
            <p>Compra simples e segura</p>
          </div>
          <div>
            <div>
              <Cube size={16} weight="fill" />
            </div>
            <p>Embalagem mantém o café intacto</p>
          </div>
          <div>
            <div>
              <Timer size={16} weight="fill" />
            </div>
            <p>Entrega rápida e rastreada</p>
          </div>
          <div>
            <div>
              <Coffee size={16} weight="fill" />
            </div>
            <p>O café chega fresquinho até você</p>
          </div>
        </div>
      </div>
      <img
        src={CoffeeBanner}
        alt="Copo de café sob fundo amarelo com grãos de café"
      />
    </div>
  );
}
