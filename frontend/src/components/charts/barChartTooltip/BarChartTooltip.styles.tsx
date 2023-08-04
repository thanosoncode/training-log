import { makeStyles } from 'tss-react/mui';

import theme from '../../../theme';

export const useStyles = makeStyles()(() => {
  return {
    container: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: '5px',
      padding: theme.spacing(0.5, 3)
    },
    inner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }
  };
});
