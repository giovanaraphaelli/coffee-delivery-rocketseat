import { ReactNode } from 'react';
import { Navbar } from '../Navbar';
import styles from './styles.module.css';

interface LayoutProps {
  children: ReactNode;
}

export function LayoutBase({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <div className={styles.container}>{children}</div>
    </>
  );
}
