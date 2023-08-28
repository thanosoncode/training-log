import { makeStyles } from 'tss-react/mui';
import { Skeleton } from '@mui/material';
import { keyframes } from 'tss-react';
import theme from '../../../../theme';

const DetailsChartSkeleton = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.flex}>
        <div className={classes.cardio}></div>
        <div className={classes.strength}></div>
      </div>

      <Skeleton width={240} height={30} className={classes.label} />
    </div>
  );
};
export default DetailsChartSkeleton;

const useStyles = makeStyles()(() => ({
  root: { paddingLeft: '4px' },
  flex: {
    width: 300,
    height: 280,
    border: `1px solid ${theme.palette.common.topGradient}`,
    borderTop: 'none',
    borderRight: 'none',
    display: 'flex',
    gap: '100px',
    alignItems: 'flex-end',
    paddingLeft: '60px'
  },
  cardio: {
    height: '140px',
    width: '40px',
    background: theme.palette.common.topGradient,
    borderTopLeftRadius: '2px',
    borderTopRightRadius: '2px'
  },
  strength: {
    height: '100%',
    width: '40px',
    background: theme.palette.common.topGradient,
    borderTopLeftRadius: '2px',
    borderTopRightRadius: '2px'
  },
  label: {
    marginTop: '16px'
  }
}));
