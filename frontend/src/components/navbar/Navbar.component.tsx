import { CalendarMonth, FitnessCenter, Insights } from '@mui/icons-material';
import { Box } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import { useStyles } from './Navbar.styles';

const Navbar = () => {
  const { classes, cx } = useStyles();
  const { pathname } = useLocation();

  return (
    <Box className={classes.navbarRoot}>
      <NavLink
        to="/"
        className={cx({
          [classes.link]: true,
          [classes.active]: pathname === '/'
        })}>
        <Box className={classes.linkContainer}>
          <CalendarMonth />
          calendar
        </Box>
      </NavLink>
      <NavLink
        to="/my-workouts"
        className={cx({
          [classes.link]: true,
          [classes.active]: pathname === '/my-workouts'
        })}>
        <Box className={classes.linkContainer}>
          <FitnessCenter />
          workouts
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
          progression
        </Box>
      </NavLink>
    </Box>
  );
};
export default Navbar;
