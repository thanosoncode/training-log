import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
  container: {
    height: '360px',
    width: '360px',
    overflow: 'hidden',
    padding: '5px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '20px',
    paddingRight: '20px'
  },

  expandYearsButton: {
    transform: 'rotate(180deg)'
  },
  previousNext: {
    display: 'none'
  }
}));
