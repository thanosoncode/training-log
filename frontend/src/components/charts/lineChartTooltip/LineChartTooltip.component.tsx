import { Box, Typography } from '@mui/material';

import theme from '../../../theme';
import { useStyles } from './LineChartTooltip.styles';

const LineChartTooltip = ({ active, payload }: { payload?: any; active?: boolean }) => {
  const { classes } = useStyles();
  if (active && payload) {
    return (
      <Box className={classes.container}>
        <Box className={classes.inner}>
          <Typography variant="subtitle1">Top weight</Typography>
          <Typography sx={{ color: theme.palette.primary.main }}>{payload[0].payload.topWeight} kg</Typography>
        </Box>
      </Box>
    );
  }

  return null;
};

export default LineChartTooltip;
