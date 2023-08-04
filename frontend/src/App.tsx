import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import Error from './components/error/Error.component';
import RootLayout from './components/rootLayout/RootLayout.component';
import Home from './pages/home/Home.component';
import Progression from './pages/progression/Progression.component';
import Workouts from './pages/workouts/Workouts.component';
import theme from './theme';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<Error />}>
      <Route index element={<Home />} errorElement={<Error />} />
      <Route path="/my-workouts" element={<Workouts />} errorElement={<Error />} />
      <Route path="/progression" element={<Progression />} errorElement={<Error />} />
    </Route>
  )
);
const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
};
export default App;
