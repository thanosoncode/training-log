import { makeStyles } from 'tss-react/mui';

import theme from '../../theme';

export const useStyles = makeStyles()(() => ({
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px'
  },
  amount: {
    width: 20,
    height: 20,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14
  }
}));
