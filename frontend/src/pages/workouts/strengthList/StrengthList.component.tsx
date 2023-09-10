import DeleteForever from '@mui/icons-material/DeleteForever';
import { Box, Button, IconButton, SelectChangeEvent, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import { deleteWorkoutStrength, getAllStrength } from '../../../api/workouts';
import ConfirmationDialog from '../../../components/confirmationDialog/ConfirmationDialog.component';
import ExercisesList from '../../../components/exerciseList/ExercisesList.component';
import FIlterBy from '../../../components/filterBy/FIlterBy.component';
import { LONG_CACHE, strengthLabels } from '../../../utils/constants';
import { Workout } from '../../../utils/models';
import { useStyles } from './StrengthList.styles';
import { useAppState } from '../../../context/AppContext';

const StrengthList = () => {
  const { classes, cx } = useStyles();
  const queryClient = useQueryClient();
  const { month, year, user } = useAppState();
  const [selectedLabel, setSelectedLabel] = useState('');
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState('');
  const [showCurrentMonth, setShowCurrentMonth] = useState(false);

  const handleLabelChange = (event: SelectChangeEvent<string>) => setSelectedLabel(event.target.value);

  const { data: workouts, isLoading } = useQuery(['strength'], () => getAllStrength({ month: 0, year: 0, userId: user?.id ?? '' }), {
    refetchOnWindowFocus: false,
    staleTime: LONG_CACHE
  });

  const { mutate: deleteSelectedWorkout, isLoading: isDeleting } = useMutation(['delete-strength'], deleteWorkoutStrength, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['strength'] })
  });

  const handleDelete = (id: string | undefined) => {
    if (id) {
      setWorkoutToDelete(id);
      setIsConfirmationDialogOpen(true);
    }
  };

  const handleDeleteAction = (confirm: boolean) => {
    if (confirm && workoutToDelete) {
      deleteSelectedWorkout(workoutToDelete);
      setIsConfirmationDialogOpen(false);
    }
    setIsConfirmationDialogOpen(false);
  };

  const filteredWorkouts = selectedLabel ? workouts && workouts.filter((w) => w.label === selectedLabel) : workouts;

  const strengthMap =
    workouts &&
    workouts.reduce((acc: { [key: string]: number }, workout) => {
      if (acc[workout.label]) {
        acc[workout.label]++;
      } else {
        acc[workout.label] = 1;
      }
      return acc;
    }, {});

  const strengthToShow = showCurrentMonth
    ? filteredWorkouts && filteredWorkouts.filter((w) => new Date(w.createdAt).getMonth() + 1 !== new Date().getMonth())
    : filteredWorkouts;

  return (
    <Box className={classes.root}>
      <>
        <Box className={classes.titleContainer}>
          <Box className={classes.buttonsContainer}>
            <Button
              onClick={() => setShowCurrentMonth(!showCurrentMonth)}
              className={cx({ [classes.monthButton]: true, [classes.monthButtonActive]: showCurrentMonth })}>
              Show only this month
            </Button>
            <FIlterBy selectedLabel={selectedLabel} labels={strengthLabels} workoutsMap={strengthMap} handleLabelChange={handleLabelChange} />
          </Box>
        </Box>
        <Box className={classes.workoutsContainer}>
          {isLoading && <CircularProgress />}
          {strengthToShow && strengthToShow.length > 0 ? (
            strengthToShow.map((workout: Workout) => {
              const { id, label, exercises } = workout;
              return (
                <Box key={id} className={classes.workout}>
                  <Box className={classes.workoutTitle}>
                    <Box>
                      <Typography variant="h6" className={classes.workoutLabel}>
                        {label}
                      </Typography>
                      <Typography variant="subtitle2" className={classes.workoutDate}>
                        {workout?.createdAt ? format(new Date(workout?.createdAt).getTime(), 'dd/MM/yyyy') : ''}{' '}
                      </Typography>
                    </Box>
                    <IconButton onClick={() => handleDelete(id)} sx={{ padding: 0 }}>
                      <DeleteForever sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                  <Box className={classes.exercisesListContainer}>
                    <ExercisesList exercises={exercises} showTitle={false} colorLabel={true} />
                  </Box>
                </Box>
              );
            })
          ) : (
            <Typography sx={{ marginTop: '16px' }}>Not many things to show.</Typography>
          )}
        </Box>
      </>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isDeleting}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ConfirmationDialog open={isConfirmationDialogOpen} onAction={handleDeleteAction} />
    </Box>
  );
};
export default StrengthList;
