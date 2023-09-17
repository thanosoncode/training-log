import { makeStyles } from 'tss-react/mui';
import theme from '../../theme';

export const useStyles = makeStyles()(() => ({
  container: { minHeight: '100vh', overflowX: 'hidden', paddingBottom: theme.spacing(8) },
  outletContainer: { maxWidth: 1000, margin: '0 auto', padding: theme.spacing(6, 3, 0, 3) },
  outletContainerMobile: { padding: theme.spacing(2, 1, 0, 1) },
  mobileNavbarContainer: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    background: theme.palette.background.default,
    width: '100%'
  },
  circularRoot: {
    marginTop: '128px',
    display: 'flex',
    justifyContent: 'center'
  }
}));
