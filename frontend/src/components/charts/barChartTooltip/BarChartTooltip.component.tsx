import { Box, Typography } from '@mui/material';

import theme from '../../../theme';
import { useStyles } from './BarChartTooltip.styles';

const BarTooltip = ({ active, payload }: { payload?: any; active?: boolean }) => {
  const { classes } = useStyles();

  if (active && payload) {
    return (
      <Box className={classes.container}>
        <Box className={classes.inner}>
          <Typography variant="h6">
            {payload[0].payload.sets} sets
            {' x '}
            {payload[0].payload.reps} reps
          </Typography>
          <Typography sx={{ color: theme.palette.primary.main }}>&#64; {payload[0].payload.weight} kg</Typography>
        </Box>
      </Box>
    );
  }

  return null;
};

export default BarTooltip;
