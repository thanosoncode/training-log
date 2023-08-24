import React from 'react';
import { CardioWorkoutFromServer, StrengthWorkoutServer } from '../../../utils/models';
import Box from '@mui/material/Box';
import { useCountdown } from '../../../utils/useCountdown';
import { useStyles } from './DetailsChart.styles';
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { CARDIO_COLOR, STRENGTH_COLOR } from '../../../utils/constants';
import DetailsTooltip from './detailsTooltip/DetailsTooltip.component';
import DetailsChartSkeleton from './detailsChartSkeleton/DetailsChartSkeleton.component';
export interface DetailsProps {
  isStrengthLoading: boolean;
  isCardioLoading: boolean;
  cardio: CardioWorkoutFromServer[] | undefined;
  strength: StrengthWorkoutServer[] | undefined;
}

const DetailsChart: React.FC<DetailsProps> = ({ cardio, strength, isStrengthLoading, isCardioLoading }) => {
  const { classes, cx } = useStyles();

  const data = [
    { type: 'Cardio', amount: cardio ? cardio.length : 0, fill: CARDIO_COLOR },
    { type: 'Strength', amount: strength ? strength.length : 0, fill: STRENGTH_COLOR }
  ];

  if (isStrengthLoading || isCardioLoading) {
    return <DetailsChartSkeleton />;
  }

  const summaryMessage = () => {
    if (cardio && cardio.length === 0 && strength && strength.length === 0) {
      return <div>No many workouts this month</div>;
    }
    if (cardio && strength) {
      return (
        <div style={{ maxWidth: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div> This month you're rocking</div>{' '}
          <div>
            <span className={cx({ [classes.highlight]: true, [classes.cardio]: true })}>{cardio && cardio.length} cardio</span> and{' '}
            <span className={cx({ [classes.highlight]: true, [classes.strength]: true })}>{strength && strength.length} strength</span> workouts
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <BarChart width={360} height={320} data={data}>
        <XAxis dataKey="type" />
        <YAxis width={40} />
        <Tooltip content={<DetailsTooltip />} wrapperStyle={{ outline: 'none' }} cursor={{ fill: 'none' }} />
        <Bar dataKey="amount" name="Cardio" barSize={40} />
      </BarChart>
      {summaryMessage()}
    </>
  );
};
export default DetailsChart;
