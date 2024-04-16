'use client';
import { ReactNode } from 'react';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import ReturnProcessControllerProvider from '../context/ReturnProcessControllerContext';

export const App = ({ children }: { children: ReactNode }) => {
  return (
    <ReturnProcessControllerProvider>
      <Theme>{children}</Theme>
    </ReturnProcessControllerProvider>
  );
};
