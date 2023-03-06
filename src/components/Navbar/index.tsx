import { MapPin, ShoppingCart } from 'phosphor-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.svg';
import styles from './styles.module.css';

export function Navbar() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={Logo} alt="Logo Coffee Delivery" />
      </Link>
      <div className={styles.actions}>
        <div className={styles.location}>
          <MapPin size={32} color="#8047F8" weight="fill" />
          <span>São Paulo, SP</span>
        </div>
        <div className={styles.cart}>
          <Link to="/checkout">
            <ShoppingCart size={32} weight="fill" color="#C47F17" />
          </Link>
        </div>
      </div>
    </header>
  );
}
