import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  navbarRoot: {
    padding: theme.spacing(3, 0, 0, 0),
    borderBottom: '1px solid #474747'
  },
  navbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: 1000,
    margin: '0 auto'
  },
  logo: {
    textDecoration: 'none',
    color: 'inherit',
    textTransform: 'uppercase',
    fontWeight: 'bolder',
    fontSize: '20px'
  },
  centerLinks: {
    display: 'flex',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '10px'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    borderBottom: `2px solid transparent`,
    padding: '0px 4px 16px 4px',
    height: 'min-content',
    fontWeight: 'bolder'
  },
  active: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    transition: '0.2s ease-out'
  },
  userIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: 0,
    height: 'min-content'
  },
  modeButton: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: 0,
    height: 'min-content'
  },
  listItemContainer: {
    display: 'flex',
    gap: '12px'
  }
}));
