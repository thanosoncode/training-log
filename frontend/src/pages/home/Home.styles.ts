import { makeStyles } from 'tss-react/mui';

import theme from '../../theme';

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '32px',
    marginTop: '64px'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '32px'
  },
  date: { marginBottom: 2 },
  details: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minWidth: 360
  },
  tableContainer: {
    width: 350
  }
}));
