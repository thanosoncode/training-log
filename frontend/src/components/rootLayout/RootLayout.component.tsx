import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import theme from '../../theme';
import Navbar from '../navbar/Navbar.component';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useStyles } from './RootLayout.styles';

const RootLayout = () => {
  const { classes } = useStyles();
  const isDesktopView = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Box className={classes.container}>
      {isDesktopView && <Navbar />}
      <Box className={classes.outletContainer}>
        <Outlet />
      </Box>
      {!isDesktopView && (
        <Box className={classes.mobileNavbarContainer}>
          <Navbar />
        </Box>
      )}
    </Box>
  );
};
export default RootLayout;
