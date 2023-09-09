import { CalendarMonth, FitnessCenter, Insights } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useStyles } from './Navbar.styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Add } from '@mui/icons-material';
import { useAppState } from '../../context/AppContext';

interface NavbarProps {
  mode: 'light' | 'dark';
  handleThemeMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleThemeMode, mode }) => {
  const { classes, cx } = useStyles();
  const { pathname } = useLocation();
  const { user } = useAppState();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsUserMenuOpen(true);
  };
  const handleCloseUserMenu = () => {
    setAnchorEl(null);
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    const token = document.cookie.split('authToken=')[1];
    if (token) {
      document.cookie = 'authToken=; path=/;';
      window.location.href = '/';
    }
  };

  return (
    <Box className={classes.navbarRoot}>
      <Box className={classes.navbarContainer}>
        <Box className={classes.leftSide}>
          <Link to="/" className={classes.logo}>
            Training log
          </Link>
          <Box className={classes.links}>
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
              to="/workouts/strength"
              className={cx({
                [classes.link]: true,
                [classes.active]: pathname.startsWith('/workouts')
              })}>
              <Box className={classes.linkContainer}>
                <FitnessCenter fontSize="small" />
                Workouts
              </Box>
            </NavLink>
            <NavLink
              to="/progress"
              className={cx({
                [classes.link]: true,
                [classes.active]: pathname === '/progress'
              })}>
              <Box className={classes.linkContainer}>
                <Insights fontSize="small" />
                Progress
              </Box>
            </NavLink>
          </Box>
        </Box>
        <Box className={classes.rightSide}>
          {pathname === '/new-workout' ? null : (
            <NavLink to="/new-workout">
              <Button variant="contained" className={classes.newWorkoutButton} endIcon={<Add />}>
                New
              </Button>
            </NavLink>
          )}
          <Box>
            <IconButton className={classes.userIcon} onClick={handleUserMenuClick}>
              {user?.email ? <Typography className={classes.userLetter}>{user?.email.slice(0, 1)}</Typography> : <AccountCircleIcon />}
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={isUserMenuOpen}
              onClose={handleCloseUserMenu}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              MenuListProps={{
                'aria-labelledby': 'user-menu'
              }}>
              <Typography className={classes.userEmail}>{user?.email}</Typography>
              <Divider />
              <MenuItem>
                <IconButton onClick={handleThemeMode} className={classes.modeButton}>
                  {mode === 'light' ? (
                    <Box className={classes.listItemContainer}>
                      <WbSunnyIcon fontSize="small" />
                      <Typography variant="subtitle1">Dark mode</Typography>
                    </Box>
                  ) : (
                    <Box className={classes.listItemContainer}>
                      <DarkModeIcon fontSize="small" />
                      <Typography variant="subtitle1">Light mode</Typography>
                    </Box>
                  )}
                </IconButton>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <IconButton className={classes.modeButton}>
                  <Box className={classes.listItemContainer}>
                    <LogoutIcon fontSize="small" />
                    <Typography>Log out</Typography>
                  </Box>
                </IconButton>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Navbar;
