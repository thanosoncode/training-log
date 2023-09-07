import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar.component';
import { useStyles } from './RootLayout.styles';
import { useAppState } from '../../context/AppContext';
import AuthPage from '../../pages/auth/AuthPage.component';

interface RootLayoutProps {
  mode: 'light' | 'dark';
  handleThemeMode: () => void;
}

const RootLayout: React.FC<RootLayoutProps> = ({ mode, handleThemeMode }) => {
  const { classes } = useStyles();
  const { user } = useAppState();

  const app = (
    <Box className={classes.container}>
      <Navbar mode={mode} handleThemeMode={handleThemeMode} />
      <Box className={classes.outletContainer}>
        <Outlet />
      </Box>
    </Box>
  );

  return user ? app : <AuthPage />;
};
export default RootLayout;
