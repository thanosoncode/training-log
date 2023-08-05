import { CalendarMonth, FitnessCenter, Insights } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { useStyles } from './Navbar.styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface NavbarProps {
  mode: 'light' | 'dark';
  handleThemeMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleThemeMode, mode }) => {
  const { classes, cx } = useStyles();
  const { pathname } = useLocation();

  return (
    <Box className={classes.navbarRoot}>
      <Box className={classes.navbarContainer}>
        <Link to="/" className={classes.logo}>
          Training log
        </Link>

        <Box className={classes.centerLinks}>
          <NavLink
            to="/"
            className={cx({
              [classes.link]: true,
              [classes.active]: pathname === '/'
            })}>
            <Box className={classes.linkContainer}>
              <CalendarMonth fontSize="small" />
              Calendar
            </Box>
          </NavLink>
          <NavLink
            to="/my-workouts"
            className={cx({
              [classes.link]: true,
              [classes.active]: pathname === '/my-workouts'
            })}>
            <Box className={classes.linkContainer}>
              <FitnessCenter fontSize="small" />
              Workouts
            </Box>
          </NavLink>
          <NavLink
            to="/progression"
            className={cx({
              [classes.link]: true,
              [classes.active]: pathname === '/progression'
            })}>
            <Box className={classes.linkContainer}>
              <Insights />
              Progress
            </Box>
          </NavLink>
        </Box>
        <IconButton onClick={handleThemeMode} className={classes.modeIcon}>
          {mode === 'light' ? <WbSunnyIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};
export default Navbar;
