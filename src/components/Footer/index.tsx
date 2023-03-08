import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        desenvolvido por{' '}
        <a href="https://giovanaraphaelli.vercel.app/">@girapha</a>
      </p>
    </footer>
  );
}
