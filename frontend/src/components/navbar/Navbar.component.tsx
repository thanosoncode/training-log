import { CalendarMonth, FitnessCenter, Insights } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Menu, MenuItem, Typography, useMediaQuery } from '@mui/material';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useStyles } from './Navbar.styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Add } from '@mui/icons-material';
import { useAppState } from '../../context/AppContext';
import MenuIcon from '@mui/icons-material/Menu';

interface NavbarProps {
  mode: 'light' | 'dark';
  handleThemeMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleThemeMode, mode }) => {
  const { classes, cx } = useStyles();
  const { pathname } = useLocation();
  const { user } = useAppState();
  const mobileView = useMediaQuery('(max-width:800px)');
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
    setIsUserMenuOpen(true);
  };
  const handleCloseUserMenu = () => {
    setUserMenuAnchorEl(null);
    setIsUserMenuOpen(false);
  };

  const handleMobileMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
    setIsMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
    setIsMobileMenuOpen(false);
  };

  const handleThemeModeClick = () => {
    handleThemeMode();
    handleCloseUserMenu();
  };

  const handleLogout = () => {
    const token = document.cookie.split('authToken=')[1];
    if (token) {
      document.cookie = 'authToken=; path=/;';
      window.location.href = '/';
    }
  };

  const mobileLinks = [
    { name: 'Calendar', to: '/', icon: <CalendarMonth fontSize="small" /> },
    { name: 'Workout', to: '/workouts/strength', icon: <FitnessCenter fontSize="small" /> },
    { name: 'Progress', to: '/progress', icon: <Insights fontSize="small" /> }
  ];

  return (
    <Box className={cx({ [classes.navbarRoot]: true, [classes.navbarRootMobile]: mobileView })}>
      <Box className={cx({ [classes.navbarContainer]: true, [classes.navbarContainerMobile]: mobileView })}>
        <Box className={classes.leftSide}>
          <Link to="/" className={cx({ [classes.logo]: true, [classes.logoHide]: mobileView })}>
            Training log
          </Link>
          <Box className={cx({ [classes.mobileMenuButton]: true, [classes.mobileMenuButtonShow]: mobileView })}>
            <IconButton onClick={handleMobileMenuClick}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={mobileMenuAnchorEl}
              open={isMobileMenuOpen}
              onClose={handleMobileMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              MenuListProps={{
                'aria-labelledby': 'mobile-menu'
              }}>
              {mobileLinks.map((link) => (
                <MenuItem key={link.name}>
                  <NavLink
                    to={link.to}
                    className={cx({
                      [classes.linkMobile]: true,
                      [classes.linkMobileActive]: pathname === link.to
                    })}
                    onClick={handleMobileMenuClose}>
                    <Box className={classes.mobileLinkContainer}>
                      <span>{link.icon}</span>
                      <span> {link.name}</span>
                    </Box>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box className={cx({ [classes.links]: true, [classes.linksHide]: mobileView })}>
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
        <Box className={cx({ [classes.rightSide]: true, [classes.rightSideMobile]: mobileView })}>
          {pathname === '/new-workout' ? null : (
            <NavLink to="/new-workout">
              <Button variant="contained" className={cx({ [classes.newWorkoutButton]: true })} endIcon={<Add />}>
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
              anchorEl={userMenuAnchorEl}
              open={isUserMenuOpen}
              onClose={handleCloseUserMenu}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              MenuListProps={{
                'aria-labelledby': 'user-menu'
              }}>
              <Typography className={classes.userEmail}>{user?.email}</Typography>
              <Divider />
              <MenuItem onClick={handleThemeModeClick}>
                <IconButton className={classes.modeButton}>
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
