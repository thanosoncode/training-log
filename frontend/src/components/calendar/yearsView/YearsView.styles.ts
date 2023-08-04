import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  years: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4,80px)',
    rowGap: '20px',
    maxHeight: '400px',
    overflow: 'scroll',
    width: 'min-content',
    alignItems: 'center',
    justifyItems: 'center',
    paddingBottom: '60px',
    padding: theme.spacing(1, 1, 16, 1),
    margin: '0 auto',
    fontSize: '18px'
  },
  year: {
    padding: theme.spacing(0.5, 2),
    cursor: 'pointer',
    borderRadius: '99px',
    '&: hover': {
      backgroundColor: theme.palette.grey[300]
    }
  },
  isCurrentYear: {
    padding: theme.spacing(0.5, 2),
    cursor: 'pointer',
    borderRadius: '99px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&: hover': {
      backgroundColor: 'none'
    }
  }
}));
