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
  },
  head: {
    backgroundColor: 'black'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  },
  deleteIcon: { cursor: 'pointer', '&:hover': { color: 'gray' }, fontSize: '16px' },
  headCell: { color: theme.palette.text.secondary, textAlign: 'center' },
  cellName: { fontWeight: 500 }
}));
