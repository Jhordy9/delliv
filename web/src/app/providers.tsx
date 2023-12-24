'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/app/theme';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme} resetCSS>
        {children}
      </ChakraProvider>
    </ReduxProvider>
  );
}
