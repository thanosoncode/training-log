import { Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import theme from '../../theme';

const WorkoutsLayout = () => {
  const { pathname } = useLocation();
  const { classes, cx } = useStyles();
  return (
    <Box>
      <Box className={classes.linksContainer}>
        <Link to="/workouts/strength" className={cx({ [classes.link]: true, [classes.linkSelected]: pathname === '/workouts/strength' })}>
          Strength
        </Link>
        <Link to="/workouts/cardio" className={cx({ [classes.link]: true, [classes.linkSelected]: pathname === '/workouts/cardio' })}>
          Cardio
        </Link>
      </Box>
      <Outlet />
    </Box>
  );
};
export default WorkoutsLayout;

const useStyles = makeStyles()(() => ({
  linksContainer: { display: 'flex', justifyContent: 'center', marginTop: '32px', gap: '16px' },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    borderBottom: '1px solid transparent',
    padding: theme.spacing(1),
    fontWeight: 'bolder'
  },
  linkSelected: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main
  }
}));
