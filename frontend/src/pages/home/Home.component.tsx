import { Box, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getSingleWorkout, getWorkouts } from '../../api/workouts';
import Calendar from '../../components/calendar/Calendar.component';
import PieChart from '../../components/charts/PieChart';
import ExercisesList from '../../components/exerciseList/ExercisesList.component';
import { LONG_CACHE } from '../../utils/constants';
import { useStyles } from './Home.styles';
import { getAllCardio } from '../../api/cardio';

const Home = () => {
  const { classes } = useStyles();
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>('');

  const { data: strengthWorkouts, isLoading: isWorkoutsLoading } = useQuery(['strength'], getWorkouts, {
    refetchOnWindowFocus: false
  });

  const { data: cardio, isLoading: isCardioLoading } = useQuery(['cardio'], getAllCardio, {
    refetchOnWindowFocus: false,
    staleTime: LONG_CACHE
  });

  const { data: workout, isLoading: isSingleWorkoutLoading } = useQuery(['single-workout', selectedWorkoutId], () => getSingleWorkout(selectedWorkoutId));

  const rightSideContent = () => {
    if (strengthWorkouts && !selectedWorkoutId) {
      return <Typography>Pick a date for more info.</Typography>;
    }
    if (isSingleWorkoutLoading) {
      return <CircularProgress />;
    }
    if (selectedWorkoutId && !isSingleWorkoutLoading) {
      return (
        <>
          <Box className={classes.exercisesListContainer}>
            <ExercisesList exercises={workout?.exercises ?? []} workout={workout} showTitle={true} />
          </Box>
          <PieChart data={workout?.exercises ?? []} />
        </>
      );
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        {isWorkoutsLoading ? <CircularProgress /> : <Calendar setSelectedWorkoutId={setSelectedWorkoutId} strengthWorkouts={strengthWorkouts} />}
        <Box className={classes.details}>{rightSideContent()}</Box>
      </Box>
    </Box>
  );
};
export default Home;
