import { makeStyles } from 'tss-react/mui';

import theme from '../../../theme';

export const useStyles = makeStyles()(() => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'cetner',
    alignItems: 'center',
    gap: '16px',
    margin: theme.spacing(3, 0, 4, 0),
    height: 40,
    padding: theme.spacing(0, 1)
  }
}));
