import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  days: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7,50px)',
    gridTemplateRows: 'repeat(6,50px)',
    alignItems: 'center',
    justifyItems: 'center',
    width: 'min-content',
    fontSize: '14px'
  },
  day: {
    cursor: 'pointer',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: theme.spacing(1),
    '&: hover': {
      backgroundColor: theme.palette.grey[300]
    }
  },
  dayActive: {
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  },
  label: {
    position: 'absolute',
    top: '30px',
    color: theme.palette.primary.main
  }
}));
