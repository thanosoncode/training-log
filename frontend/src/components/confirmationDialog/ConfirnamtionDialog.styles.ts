import { makeStyles } from 'tss-react/mui';
import theme from '../../theme';

export const useStyles = makeStyles()(() => ({
  container: { padding: theme.spacing(2) },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: theme.spacing(4)
  }
}));
