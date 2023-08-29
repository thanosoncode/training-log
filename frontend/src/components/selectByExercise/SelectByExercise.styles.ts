import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    textTransform: 'capitalize'
  },
  count: {
    width: 20,
    height: 20,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14
  },
  select: { '& > div': { display: 'flex', gap: '16px' } }
}));
