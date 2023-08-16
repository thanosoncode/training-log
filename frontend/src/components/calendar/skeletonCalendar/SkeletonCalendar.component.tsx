import { Box, Paper, Skeleton } from '@mui/material';
import { useStyles } from './SkeletonCalendar.styles';

const SkeletonCalendar = () => {
  const { classes } = useStyles();
  return (
    <Paper className={classes.container} sx={{ boxShadow: 3 }}>
      <Box className={classes.header}>
        <Skeleton variant="rectangular" width={160} height={20} />
        <Skeleton variant="rectangular" width={80} height={20} />
      </Box>
      <Skeleton variant="rectangular" width="100%" height={20} />
      <Box className={classes.days}>
        <Skeleton variant="rectangular" width={120} height={20} className={classes.firstRow} />
        <Skeleton variant="rectangular" width="100%" height={20} />
        <Skeleton variant="rectangular" width="100%" height={20} />
        <Skeleton variant="rectangular" width="100%" height={20} />
        <Skeleton variant="rectangular" width="100%" height={20} />
        <Skeleton variant="rectangular" width={120} height={20} />
      </Box>
    </Paper>
  );
};
export default SkeletonCalendar;
