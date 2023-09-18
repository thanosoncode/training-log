import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  mobileRoot: { padding: theme.spacing(0, 4) },
  fieldsContainer: { display: 'flex', gap: '24px' },
  fieldsContainerMobile: { flexDirection: 'column', gap: '32px' },
  label: { textTransform: 'capitalize', lineHeight: 'intial', marginBottom: '64px' }
}));
