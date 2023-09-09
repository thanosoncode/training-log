import { Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getSingleWorkoutStrength, getAllStrength } from '../../api/workouts';
import Calendar from '../../components/calendar/Calendar.component';
import ExercisesList from '../../components/exerciseList/ExercisesList.component';
import { useStyles } from './Home.styles';
import { getAllCardio, getSingleCardio } from '../../api/cardio';
import SingleCardioTable from '../../components/singleCardioTable/SingleCardioTable.component';
import { useAppState } from '../../context/AppContext';
import { LONG_CACHE } from '../../utils/constants';
import SkeletonCalendar from '../../components/calendar/skeletonCalendar/SkeletonCalendar.component';
import DetailsChart from './detailsChart/DetailsChart.component';
import WorkoutSkeletonTable from './workoutSkeletonTable/WorkoutSkeletonTable.component';

const Home = () => {
  const { classes } = useStyles();
  const { selectedStrengthId, selectedCardioId, month, year, selectedType, user } = useAppState();

  const { isLoading: isStrengthLoading, data: strength } = useQuery(['strength', month, year], () => getAllStrength({ month, year, userId: user?.id ?? '' }), {
    refetchOnWindowFocus: false,
    staleTime: LONG_CACHE
  });

  const { isLoading: isCardioLoading, data: cardio } = useQuery(['cardio', month, year], () => getAllCardio({ month, year, userId: user?.id ?? '' }), {
    refetchOnWindowFocus: false,
    staleTime: LONG_CACHE
  });

  const { data: singleWorkout, isLoading: isSingleStrengthLoading } = useQuery(
    ['single-workout', selectedStrengthId],
    () => getSingleWorkoutStrength(selectedStrengthId),
    {
      staleTime: LONG_CACHE
    }
  );

  const { data: singleCardio, isLoading: isSingleCardioLoading } = useQuery(['single-cardio', selectedCardioId], () => getSingleCardio(selectedCardioId), {
    staleTime: LONG_CACHE
  });

  const selectedWorkoutDetails = () => {
    if (isSingleStrengthLoading || isSingleCardioLoading) {
      return <WorkoutSkeletonTable />;
    }
    if (selectedStrengthId && singleWorkout && selectedType === 'strength') {
      return (
        <>
          <Box className={classes.tableContainer}>
            <ExercisesList exercises={singleWorkout?.exercises ?? []} workout={singleWorkout} showTitle={true} colorLabel={true} />
          </Box>
        </>
      );
    }
    if (selectedCardioId && singleCardio && selectedType === 'cardio') {
      return (
        <>
          <Box className={classes.tableContainer}>
            <SingleCardioTable cardio={singleCardio} />
          </Box>
        </>
      );
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        {isStrengthLoading || isCardioLoading ? <SkeletonCalendar /> : <Calendar />}
        <Box className={classes.details}>
          <DetailsChart isCardioLoading={isCardioLoading} isStrengthLoading={isStrengthLoading} cardio={cardio} strength={strength} />
        </Box>
      </Box>
      {selectedWorkoutDetails()}
    </Box>
  );
};
export default Home;
