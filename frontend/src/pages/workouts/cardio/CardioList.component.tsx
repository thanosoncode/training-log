import Box from '@mui/material/Box';
import { useStyles } from './CardioList.styles';
import { useState } from 'react';
import FIlterBy from '../../../components/filterBy/FIlterBy.component';
import { SelectChangeEvent } from '@mui/material/Select';
import { LONG_CACHE, cardioLabels } from '../../../utils/constants';
import { useQuery } from '@tanstack/react-query';
import { getAllCardio } from '../../../api/cardio';

const CardioList = () => {
  const { classes } = useStyles();
  const [selectedLabel, setSelectedLabel] = useState('');

  const handleLabelChange = (event: SelectChangeEvent<string>) => setSelectedLabel(event.target.value);

  const { data: cardio, isLoading } = useQuery(['cardio'], getAllCardio, {
    refetchOnWindowFocus: false,
    staleTime: LONG_CACHE
  });

  const cardioMap =
    cardio &&
    cardio.reduce((acc: { [key: string]: number }, current) => {
      if (acc[current.exercise.name]) {
        acc[current.exercise.name]++;
      } else {
        acc[current.exercise.name] = 1;
      }
      return acc;
    }, {});

  return (
    <div>
      <Box className={classes.titleContainer}>
        <FIlterBy labels={cardioLabels} workoutsMap={cardioMap} selectedLabel={selectedLabel} handleLabelChange={handleLabelChange} />
      </Box>
    </div>
  );
};
export default CardioList;
