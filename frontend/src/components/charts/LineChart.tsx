import { Typography } from '@mui/material';
import { CartesianGrid, Legend, Line, LineChart as ReChartsLineChart, Tooltip, XAxis, YAxis } from 'recharts';

import theme from '../../theme';
import { TopWeigtPerExercise } from '../../utils/models';
import LineChartTooltip from './lineChartTooltip/LineChartTooltip.component';

interface BarChartsProps {
  data: TopWeigtPerExercise[];
}

const LineChart: React.FC<BarChartsProps> = ({ data }) => {
  return (
    <ReChartsLineChart width={360} height={280} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <Line type="monotone" dataKey="topWeight" fill={theme.palette.primary.main} />
      <Tooltip content={<LineChartTooltip />} payload={data} cursor={{ fill: 'none' }} />
      <Legend content={<CustomLegend />} />
      <YAxis dataKey="topWeight" tick={{ fontSize: 12 }} />
      <XAxis dataKey="createdAt" tick={{ fontSize: 12 }} />
    </ReChartsLineChart>
  );
};
export default LineChart;

const CustomLegend = () => {
  return (
    <Typography variant="subtitle2" sx={{ textAlign: 'center', color: theme.palette.info.main }}>
      Top weight used in set.
    </Typography>
  );
};
