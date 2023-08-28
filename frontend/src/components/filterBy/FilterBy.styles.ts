import { makeStyles } from 'tss-react/mui';

import theme from '../../theme';

export const useStyles = makeStyles()(() => ({
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px'
  },
  amount: {
    width: 18,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    color: 'inherit',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'bolder'
  },
  clearFilters: {
    '&.Mui-selected': { backgroundColor: 'transparent !important' },
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08) !important' }
  },
  select: { '& > div': { display: 'flex', gap: '16px' } }
}));
