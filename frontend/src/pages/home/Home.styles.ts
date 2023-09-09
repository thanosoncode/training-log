import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '32px',
    marginTop: '24px'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '60px'
  },
  mobileContainer: { flexDirection: 'column-reverse' },
  date: { marginBottom: 2 },
  details: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minWidth: 360
  },
  tableContainer: {
    width: 350
  }
}));
