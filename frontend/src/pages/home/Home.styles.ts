import { makeStyles } from 'tss-react/mui';

import theme from '../../theme';

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '32px',
    margin: theme.spacing(6, 0)
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '32px'
  },
  date: { marginBottom: 2 },
  details: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  exercisesListContainer: {
    width: 350
  }
}));
