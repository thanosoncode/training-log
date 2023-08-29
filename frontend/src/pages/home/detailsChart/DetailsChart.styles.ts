import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => {
  return {
    cardio: {
      color: theme.palette.common.cardio
    },
    strength: {
      color: theme.palette.primary.main
    },
    highlight: {
      fontSize: '20px',
      fontWeight: 'bold'
    }
  };
});
