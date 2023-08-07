import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  navbarRoot: {
    paddingTop: '24px',
    borderBottom: '1px solid #474747'
  },
  navbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: 1000,
    margin: '0 auto'
  },
  leftSide: { display: 'flex', gap: '40px', alignItems: 'flex-start' },
  logo: {
    textDecoration: 'none',
    color: 'inherit',
    textTransform: 'uppercase',
    fontWeight: 'bolder',
    fontSize: '24px',
    lineHeight: 'initial'
  },
  links: {
    display: 'flex',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'baseline'
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
    borderBottom: `1px solid transparent`,
    padding: '0px 4px 16px 4px',
    height: 'min-content',
    fontWeight: 'bolder'
  },
  active: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    transition: '0.2s ease-out'
  },
  rightSide: { display: 'flex', gap: '24px', alignItems: 'flex-start' },
  newWorkoutButton: { height: 'min-content', marginLeft: 'auto', padding: '2px 12px', textTransform: 'capitalize', fontWeight: 'bolder' },
  userIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: 0,
    height: 'min-content'
  },
  modeButton: {
    display: 'flex',

    padding: 0,
    height: 'min-content',
    '&:hover': {
      background: 'none'
    }
  },
  listItemContainer: {
    display: 'flex',
    gap: '12px',
    padding: '0 8px',
    alignItems: 'center'
  }
}));
