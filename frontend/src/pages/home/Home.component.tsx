import { Box, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getSingleWorkoutStrength, getAllStrength } from '../../api/workouts';
import Calendar from '../../components/calendar/Calendar.component';
import ExercisesList from '../../components/exerciseList/ExercisesList.component';
import { LONG_CACHE } from '../../utils/constants';
import { useStyles } from './Home.styles';
import { getAllCardio, getSingleCardio } from '../../api/cardio';
import SingleCardioTable from '../../components/singleCardioTable/SingleCardioTable.component';
import { useAppDispatch, useAppState } from '../../context/AppContext';

const Home = () => {
  const { classes } = useStyles();
  const appDispatch = useAppDispatch();
  const { selectedStrengthId, selectedCardioId } = useAppState();

  const { isLoading: isStrengthLoading } = useQuery(['strength'], getAllStrength, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => appDispatch({ type: 'SET_ALL_STRENGTH', payload: data })
  });

  const { isLoading: isCardioLoading } = useQuery(['cardio'], getAllCardio, {
    refetchOnWindowFocus: false,
    staleTime: LONG_CACHE,
    onSuccess: (data) => appDispatch({ type: 'SET_ALL_CARDIO', payload: data })
  });

  const { data: workout, isLoading: isSingleStrengthLoading } = useQuery(['single-workout', selectedStrengthId], () =>
    getSingleWorkoutStrength(selectedStrengthId)
  );

  const { data: cardio, isLoading: isSingleCardioLoading } = useQuery(['single-cardio', selectedCardioId], () => getSingleCardio(selectedCardioId));

  const rightSideContent = () => {
    if (isSingleStrengthLoading || isSingleCardioLoading) {
      return <CircularProgress />;
    }
    if (selectedStrengthId && workout) {
      return (
        <>
          <Box className={classes.tableContainer}>
            <ExercisesList exercises={workout?.exercises ?? []} workout={workout} showTitle={true} />
          </Box>
        </>
      );
    }
    if (selectedCardioId && cardio) {
      return (
        <>
          <Box className={classes.tableContainer}>
            <SingleCardioTable cardio={cardio} />
          </Box>
        </>
      );
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        {isStrengthLoading || isCardioLoading ? <CircularProgress /> : <Calendar />}
        <Box className={classes.details}>{rightSideContent()}</Box>
      </Box>
    </Box>
  );
};
export default Home;
