import { makeStyles } from 'tss-react/mui';
import theme from '../../theme';

export const useStyles = makeStyles()(() => ({
  container: { minHeight: '100vh', overflowX: 'hidden', marginRight: 'calc(-1 * (100vw - 100%))', paddingBottom: theme.spacing(8) },
  outletContainer: { maxWidth: 792, margin: '0 auto' },
  mobileNavbarContainer: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    background: theme.palette.background.default,
    width: '100%'
  }
}));
