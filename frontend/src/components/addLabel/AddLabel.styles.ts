import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: { display: 'flex', gap: 4, alignItems: 'center' }
}));
