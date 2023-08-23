import React from 'react';
import { CardioWorkoutFromServer, StrengthWorkoutServer } from '../../../utils/models';
import Box from '@mui/material/Box';
import { useCountdown } from '../../../utils/useCountdown';
import { useStyles } from './Details.styles';
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { CARDIO_COLOR, STRENGTH_COLOR } from '../../../utils/constants';
import DetailsTooltip from './detailsTooltip/DetailsTooltip.component';
export interface DetailsProps {
  isStrengthLoading: boolean;
  isCardioLoading: boolean;
  cardio: CardioWorkoutFromServer[] | undefined;
  strength: StrengthWorkoutServer[] | undefined;
}

const Details: React.FC<DetailsProps> = ({ cardio, strength, isStrengthLoading, isCardioLoading }) => {
  const { classes } = useStyles({ cardio, isCardioLoading, strength });

  const cardioCount = useCountdown(1000, cardio ? cardio.length : 0);
  const strengthCount = useCountdown(1000, strength ? strength.length : 0);

  const data = [
    { type: 'Cardio', amount: 8, fill: CARDIO_COLOR },
    { type: 'Strength', amount: 12, fill: STRENGTH_COLOR }
  ];

  if (isCardioLoading || isStrengthLoading) {
    return <div>loading</div>;
  }

  return (
    <>
      <BarChart width={360} height={320} data={data}>
        <XAxis dataKey="type" />
        <YAxis width={40} />
        <Tooltip content={<DetailsTooltip />} wrapperStyle={{ outline: 'none' }} cursor={{ fill: 'none' }} />
        <Bar dataKey="amount" name="Cardio" barSize={16} />
      </BarChart>

      <Box className={classes.container}>
        {cardio && cardio.length > 0 && (
          <Box className={classes.cardio}>
            <span className={classes.highlight}>{cardioCount}</span> Cardio
          </Box>
        )}
        {strength && strength.length > 0 && (
          <Box className={classes.strength}>
            <span className={classes.highlight}>{strengthCount}</span> Strength
          </Box>
        )}
      </Box>
    </>
  );
};
export default Details;
