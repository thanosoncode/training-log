import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar.component';
import { useStyles } from './RootLayout.styles';
import { useAppDispatch, useAppState } from '../../context/AppContext';
import AuthPage from '../../pages/auth/AuthPage.component';
import { useQuery } from '@tanstack/react-query';
import { authenticateUserToken } from '../../api/user';
import { makeStyles } from 'tss-react/mui';

interface RootLayoutProps {
  mode: 'light' | 'dark';
  handleThemeMode: () => void;
}

const RootLayout: React.FC<RootLayoutProps> = ({ mode, handleThemeMode }) => {
  const { classes, cx } = useStyles();
  const { user } = useAppState();
  const dispatch = useAppDispatch();
  const mobileView = useMediaQuery('(max-width:800px)');

  const token = document.cookie.split('authToken=')[1];

  const { isLoading } = useQuery(['auth-user-token'], () => authenticateUserToken(token), {
    retry: 1,
    onSuccess: (data) => dispatch({ type: 'SET_USER', payload: data })
  });

  const app = (
    <Box className={classes.container}>
      <Navbar mode={mode} handleThemeMode={handleThemeMode} />
      <Box className={cx({ [classes.outletContainer]: true, [classes.outletContainerMobile]: mobileView })}>
        <Outlet />
      </Box>
    </Box>
  );

  return user ? (
    app
  ) : isLoading ? (
    <div className={classes.circularRoot}>
      <CircularProgress />
    </div>
  ) : (
    <AuthPage />
  );
};
export default RootLayout;
