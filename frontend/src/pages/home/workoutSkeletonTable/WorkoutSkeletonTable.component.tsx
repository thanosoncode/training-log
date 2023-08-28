import { Skeleton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import theme from '../../../theme';

const WorkoutSkeletonTable = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Skeleton width={80} height={40} />
        <Skeleton width={120} height={40} />
      </div>
      <div className={classes.table}>
        <div className={classes.flex}>
          <Skeleton width={'30%'} />
          <Skeleton width={'30%'} />
          <Skeleton width={'30%'} />
        </div>
        <div className={classes.flex}>
          <Skeleton width={'30%'} />
          <Skeleton width={'30%'} />
          <Skeleton width={'30%'} />
        </div>
      </div>
    </div>
  );
};
export default WorkoutSkeletonTable;

const useStyles = makeStyles()(() => ({
  root: {
    width: 350
  },
  title: { padding: theme.spacing(0, 4), marginBottom: '8px', display: 'flex', gap: '40px' },
  table: {
    border: `1px solid ${theme.palette.common.bottomGradient}`,
    padding: theme.spacing(1, 2),
    borderRadius: '4px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  flex: {
    display: 'flex',
    gap: '20px'
  }
}));
