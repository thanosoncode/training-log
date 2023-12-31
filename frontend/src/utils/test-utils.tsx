import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { RouterProvider } from 'react-router-dom';

import theme from '../theme';
import AppProvider from '../context/AppContext';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </AppProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
