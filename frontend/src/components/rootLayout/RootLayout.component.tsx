import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import theme from '../../theme';
import Navbar from '../navbar/Navbar.component';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useStyles } from './RootLayout.styles';

interface RootLayoutProps {
  mode: 'light' | 'dark';
  handleThemeMode: () => void;
}

const RootLayout: React.FC<RootLayoutProps> = ({ mode, handleThemeMode }) => {
  const { classes } = useStyles();
  const isDesktopView = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Box className={classes.container}>
      {isDesktopView && <Navbar mode={mode} handleThemeMode={handleThemeMode} />}
      <Box className={classes.outletContainer}>
        <Outlet />
      </Box>
      {!isDesktopView && (
        <Box className={classes.mobileNavbarContainer}>
          <Navbar mode={mode} handleThemeMode={handleThemeMode} />
        </Box>
      )}
    </Box>
  );
};
export default RootLayout;
