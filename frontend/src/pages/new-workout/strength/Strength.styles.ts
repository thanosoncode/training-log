import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  mobileRoot: { padding: theme.spacing(0, 4) },
  labelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  label: { textTransform: 'capitalize', lineHeight: 'intial' }
}));
