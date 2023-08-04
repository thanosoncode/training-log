import { Typography } from '@mui/material';
import { Bar, BarChart as ReChartsBarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';

import theme from '../../theme';
import { VolumePerExercise } from '../../utils/models';
import BarTooltip from './barChartTooltip/BarChartTooltip.component';

interface BarChartsProps {
  data: VolumePerExercise[];
}

const BarChart: React.FC<BarChartsProps> = ({ data }) => {
  return (
    <ReChartsBarChart width={360} height={280} data={data}>
      <Bar dataKey="volume" fill={theme.palette.primary.main} barSize={20}></Bar>
      <Tooltip content={<BarTooltip />} payload={data} cursor={{ fill: 'none' }} />
      <Legend content={<CustomLegend />} />
      <YAxis dataKey="volume" tick={{ fontSize: 12 }} />
      <XAxis dataKey="createdAt" tick={{ fontSize: 12 }} />
    </ReChartsBarChart>
  );
};
export default BarChart;

const CustomLegend = () => {
  return (
    <Typography variant="subtitle2" sx={{ textAlign: 'center', color: theme.palette.info.main }}>
      Amount of volume &#40;sets x reps x weight&#41;
    </Typography>
  );
};
