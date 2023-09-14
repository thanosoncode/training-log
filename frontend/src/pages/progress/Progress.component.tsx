import { Box, SelectChangeEvent } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';

import { getAllStrength } from '../../api/workouts';
import BarChart from '../../components/charts/BarChart';
import LineChart from '../../components/charts/LineChart';
import SelectByExercise from '../../components/selectByExercise/SelectByExercise.component';
import { LONG_CACHE } from '../../utils/constants';
import { Exercise, StrengthWorkoutServer } from '../../utils/models';
import { useStyles } from './Progress.styles';
import { useAppState } from '../../context/AppContext';

const Progress = () => {
  const { classes } = useStyles();
  const queryClient = useQueryClient();
  const { user } = useAppState();
  const strengthQueryCache = queryClient.getQueryData(['strength']) as StrengthWorkoutServer[] | undefined;
  const strengthExersiceCache = strengthQueryCache && strengthQueryCache[0] && strengthQueryCache[0].exercises[0];
  const [selectedExercise, setSelectedExercise] = useState(strengthExersiceCache ? strengthQueryCache[0].exercises[0].name : '');

  const { data: workouts } = useQuery(['strength'], () => getAllStrength({ month: 0, year: 0, userId: user?.id ?? '' }), {
    staleTime: LONG_CACHE,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data.length > 0) {
        setSelectedExercise(data[0].exercises[0].name);
      }
    }
  });

  const handleSelectChange = (event: SelectChangeEvent) => setSelectedExercise(event.target.value);

  const getRecordsPerExercise = (name: string) => {
    return workouts
      ? workouts
          ?.map((w) => ({
            ...w,
            exercises: w.exercises.map((ex) => ({
              ...ex,
              createdAt: w.createdAt
            }))
          }))
          .flatMap((w) => w.exercises)
          .filter((ex) => ex.name === name)
      : [];
  };

  const allRecordsPerExercise = getRecordsPerExercise(selectedExercise);
  const calculateVolume = (exercise: Exercise) => Number(exercise.sets) * Number(exercise.reps) * Number(exercise.weight);

  const volumePerExercise = allRecordsPerExercise
    .map((ex) => {
      return {
        name: ex.name,
        volume: calculateVolume(ex),
        sets: Number(ex.sets),
        reps: Number(ex.reps),
        weight: Number(ex.weight),
        createdAt: ex.createdAt ? format(new Date(ex.createdAt).getTime(), 'dd/MM') : ''
      };
    })
    .slice(-8);

  const topWeigtPerExercise = allRecordsPerExercise
    .map((ex) => ({
      name: ex.name,
      topWeight: Number(ex.weight),
      createdAt: ex.createdAt ? format(new Date(ex.createdAt).getTime(), 'dd/MM') : ''
    }))
    .slice(-8);

  const options = Array.from(new Set((workouts ? workouts.flatMap((w) => w.exercises) : []).map((ex) => ex.name)));

  return (
    <Box className={classes.root}>
      <Box className={classes.titleContainer}>
        <SelectByExercise value={selectedExercise} onChange={handleSelectChange} options={options} showExercisesCount={true} />
      </Box>
      <Box className={classes.graphsContainer}>
        <Box>
          <Typography variant="subtitle1" className={classes.graphTitle}>
            Total Volume used
          </Typography>
          <BarChart data={volumePerExercise} />
        </Box>
        <Box>
          <Typography variant="subtitle1" className={classes.graphTitle}>
            Top weight used
          </Typography>
          <LineChart data={topWeigtPerExercise} />
        </Box>
      </Box>
    </Box>
  );
};
export default Progress;
