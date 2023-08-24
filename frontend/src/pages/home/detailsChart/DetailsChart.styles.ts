import { makeStyles } from 'tss-react/mui';
import theme from '../../../theme';

export const useStyles = makeStyles()(() => {
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
