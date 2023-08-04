import { Cell, Pie, PieChart as ReChartsPieChart, Tooltip } from 'recharts';

import { Exercise } from '../../utils/models';

interface PieChartsProps {
  data: Exercise[];
}

const PieChart: React.FC<PieChartsProps> = ({ data }) => {
  const totalReps = data.reduce((total, item) => {
    return total + Number(item.reps) * Number(item.sets);
  }, 0);
  const exercises = data
    .map((ex) => ({
      name: ex.name,
      amount: Math.floor((Number(ex.reps) * Number(ex.sets) * 40) / totalReps)
    }))
    .sort((a, b) => b.amount - a.amount);

  const COLORS = ['#1976d2', '#4791db', '#75ade4', '#8cbbe9'];

  return (
    <ReChartsPieChart width={300} height={200} margin={{ left: 40, top: 40, right: 40, bottom: 40 }}>
      <Pie data={exercises} cx="50%" cy="50%" dataKey="amount" label={(entry: { name: string; amount: number }) => entry.name.split(' ')[0]}>
        {exercises.map((_, index) => {
          return <Cell key={index} fill={COLORS[index % COLORS.length]} />;
        })}
      </Pie>
      <Tooltip />
    </ReChartsPieChart>
  );
};

export default PieChart;
