import { Banner } from '../../components/Banner';
import { Card } from '../../components/Card';
import { coffees } from '../../data/coffee-list.json';
import styles from './styles.module.css';

export function Home() {
  return (
    <>
      <Banner />
      <h2>Nossos cafés</h2>
      <div className={styles.wrapperCards}>
        {coffees.map((coffee) => (
          <Card coffee={coffee} key={coffee.id} />
        ))}
      </div>
    </>
  );
}
