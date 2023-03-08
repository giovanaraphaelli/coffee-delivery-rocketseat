import { MapPin, ShoppingCart } from 'phosphor-react';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.svg';
import { CartContext } from '../../context/CartContext';
import styles from './styles.module.css';

interface LocationData {
  city: string;
  state: string;
}

export function Navbar() {
  const [location, setLocation] = useState<LocationData>({
    city: '',
    state: '',
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setLocation({
              city: data.city,
              state: data.principalSubdivision,
            });
          });
      });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const { cart, totalAmount } = useContext(CartContext);

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src={Logo} alt="Logo Coffee Delivery" />
        </Link>
        <div className={styles.actions}>
          {location.city && location.state && (
            <div className={styles.location}>
              <MapPin size={32} color="#8047F8" weight="fill" />
              <span>{`${location.city}, ${location.state}`}</span>
            </div>
          )}

          <div className={styles.cart}>
            <Link to="/checkout">
              <ShoppingCart size={32} weight="fill" color="#C47F17" />
              {cart.length > 0 && (
                <span className={styles.notification}>{totalAmount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
