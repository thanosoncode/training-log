import { CalendarMonth, FitnessCenter, Insights } from '@mui/icons-material';
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useStyles } from './Navbar.styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Add } from '@mui/icons-material';

interface NavbarProps {
  mode: 'light' | 'dark';
  handleThemeMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleThemeMode, mode }) => {
  const { classes, cx } = useStyles();
  const { pathname } = useLocation();

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

  const handleAddButtonClick = () => {};

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
              to="/workouts"
              className={cx({
                [classes.link]: true,
                [classes.active]: pathname === '/workouts'
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
              <Button variant="contained" onClick={handleAddButtonClick} className={classes.newWorkoutButton} endIcon={<Add />}>
                New
              </Button>
            </NavLink>
          )}

          <Box>
            <IconButton className={classes.userIcon} onClick={handleUserMenuClick}>
              <AccountCircleIcon />
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
              <MenuItem>
                <IconButton onClick={handleThemeMode} className={classes.modeButton}>
                  {mode === 'light' ? (
                    <Box className={classes.listItemContainer}>
                      <DarkModeIcon fontSize="small" />
                      <Typography variant="subtitle1">Light mode</Typography>
                    </Box>
                  ) : (
                    <Box className={classes.listItemContainer}>
                      <WbSunnyIcon fontSize="small" />
                      <Typography variant="subtitle1">Dark mode</Typography>
                    </Box>
                  )}
                </IconButton>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
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
