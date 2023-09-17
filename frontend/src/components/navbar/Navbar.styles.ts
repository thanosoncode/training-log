import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  navbarRoot: {
    borderBottom: '1px solid #474747',
    padding: theme.spacing(2, 3, 0, 3)
  },
  navbarRootMobile: { paddingTop: '10px' },
  navbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: 1000,
    margin: '0 auto'
  },
  navbarContainerMobile: {
    alignItems: 'center',
    marginBottom: '8px'
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
  logoHide: { display: 'none' },
  links: {
    display: 'flex',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'baseline'
  },
  linksHide: { display: 'none' },
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
    transition: '0.5s ease',
    padding: '0px 4px 16px 4px',
    height: 'min-content',
    fontWeight: 'bolder'
  },
  linkMobile: { textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 'bold' },
  linkMobileActive: { color: theme.palette.primary.main },
  active: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    transition: '0.2s ease-out'
  },
  rightSide: { display: 'flex', gap: '24px', alignItems: 'flex-start' },
  rightSideMobile: { alignItems: 'center' },
  newWorkoutButton: { height: 'min-content', marginLeft: 'auto', padding: '2px 12px', textTransform: 'capitalize', fontWeight: 'bolder' },
  newWorkoutButtonHide: { display: 'none' },
  userIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: 0
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
  },
  userEmail: { padding: theme.spacing(1), textAlign: 'center' },
  userLetter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
    background: theme.palette.grey[500],
    borderRadius: '50%',
    textTransform: 'uppercase'
  },
  mobileMenuButton: {
    display: 'none'
  },
  mobileMenuButtonShow: { display: 'block' },
  mobileLinkContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '10px'
  }
}));
