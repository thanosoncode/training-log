import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  rootMobile: {
    display: 'flex',
    flexDirection: 'column'
  },
  info: { marginTop: 4, color: theme.palette.warning.main },
  fieldsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px'
  },
  fieldsContainerMobile: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    gap: '32px',
    '& > div': {
      marginBottom: '16px'
    }
  },
  button: { padding: '8px 16px' }
}));
