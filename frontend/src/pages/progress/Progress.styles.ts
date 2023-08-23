import { makeStyles } from 'tss-react/mui';

import theme from '../../theme';

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  titleContainer: {
    display: 'flex',
    gap: '32px',
    margin: theme.spacing(6, 0, 10, 0)
  },
  title: { marginBottom: theme.spacing(2) },
  graphsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '36px'
  },
  graphTitle: { marginBottom: theme.spacing(2) }
}));
