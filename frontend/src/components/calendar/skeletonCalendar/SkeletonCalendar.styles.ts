import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
  container: {
    height: '385px',
    width: '360px',
    padding: '20px'
  },
  header: {
    display: 'flex',
    gap: '50px',
    marginBottom: '20px'
  },
  days: {
    display: 'flex',
    gap: '25px',
    flexDirection: 'column',
    marginTop: '30px'
  },
  firstRow: { alignSelf: 'flex-end' }
}));
