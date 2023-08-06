import { CalendarMonth, FitnessCenter, Insights } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useStyles } from './Navbar.styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

interface NavbarProps {
  mode: 'light' | 'dark';
  handleThemeMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleThemeMode, mode }) => {
  const { classes, cx } = useStyles();
  const { pathname } = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Box>
          <IconButton className={classes.userIcon} onClick={handleClick}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            MenuListProps={{
              'aria-labelledby': 'user-menu'
            }}>
            <MenuItem onClick={handleClose}>
              <IconButton className={classes.modeButton}>
                <Box className={classes.listItemContainer}>
                  <LogoutIcon fontSize="small" />
                  <Typography>Log out</Typography>
                </Box>
              </IconButton>
            </MenuItem>
            <MenuItem>
              <IconButton onClick={handleThemeMode} className={classes.modeButton}>
                {mode === 'light' ? (
                  <Box className={classes.listItemContainer}>
                    <DarkModeIcon fontSize="small" />
                    <Typography>Dark mode</Typography>
                  </Box>
                ) : (
                  <Box className={classes.listItemContainer}>
                    <WbSunnyIcon fontSize="small" />
                    <Typography>Light mode</Typography>
                  </Box>
                )}
              </IconButton>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};
export default Navbar;
