import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  navbarRoot: {
    display: 'flex',
    gap: 12,
    padding: theme.spacing(2, 0),
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: { width: 40, height: 40 },
  linkContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '4px'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    borderBottom: `2px solid transparent`,
    padding: theme.spacing(0, 1, 1, 1),
    height: 'min-content'
  },
  active: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    transition: '0.2s ease-out'
  }
}));
