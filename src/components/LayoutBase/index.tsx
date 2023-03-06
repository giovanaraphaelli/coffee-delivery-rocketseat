import { ReactNode } from 'react';
import { Navbar } from '../Navbar';

interface LayoutProps {
  children: ReactNode;
}

export function LayoutBase({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
