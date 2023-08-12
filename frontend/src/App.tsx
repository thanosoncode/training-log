import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Error from './components/error/Error.component';
import RootLayout from './components/rootLayout/RootLayout.component';
import Home from './pages/home/Home.component';
import Progression from './pages/progression/Progression.component';
import { useState } from 'react';
import Strength from './pages/new-workout/strength/Strength.component';
import Cardio from './pages/new-workout/cardio/Cardio.component';
import NewWorkout from './pages/new-workout/NewWorkout';
import StrengthList from './pages/workouts/strengthList/StrengthList.component';
import CardioList from './pages/workouts/cardio/CardioList.component';
import WorkoutsLayout from './pages/workouts/WorkoutsLayout.component';

const App = () => {
  const queryClient = new QueryClient();
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const handleThemeMode = () => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

  const theme = createTheme({
    palette: {
      mode,
      common: {
        bg: '#121212',
        menu: '#181818',
        topGradient: '#404040',
        bottomGradient: '#282828',
        primaryText: '#ffffff',
        secondaryText: '#b3b3b3'
      }
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            border: 'none'
          }
        }
      }
    }
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout mode={mode} handleThemeMode={handleThemeMode} />} errorElement={<Error />}>
        <Route index element={<Home />} errorElement={<Error />} />
        <Route path="/workouts" element={<WorkoutsLayout />} errorElement={<Error />}>
          <Route path="/workouts/strength" element={<StrengthList />} errorElement={<Error />} />
          <Route path="/workouts/cardio" element={<CardioList />} errorElement={<Error />} />
        </Route>
        <Route path="/progress" element={<Progression />} errorElement={<Error />} />
        <Route path="/new-workout" element={<NewWorkout />} errorElement={<Error />} />
        <Route path="/new-workout/strength" element={<Strength />} errorElement={<Error />} />
        <Route path="/new-workout/cardio" element={<Cardio />} errorElement={<Error />} />
      </Route>
    )
  );

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
