import { Add } from '@mui/icons-material';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { Box, IconButton, SelectChangeEvent, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import { deleteWorkoutStrength, getWorkoutsStrength } from '../../../api/workouts';
import ConfirmationDialog from '../../../components/confirmationDialog/ConfirmationDialog.component';
import ExercisesList from '../../../components/exerciseList/ExercisesList.component';
import FIlterBy from '../../../components/filterBy/FIlterBy.component';
import { LONG_CACHE, strengthLabels } from '../../../utils/constants';
import { Workout } from '../../../utils/models';
import { useStyles } from './StrengthList.styles';

const StrengthList = () => {
  const { classes } = useStyles();
  const queryClient = useQueryClient();
  const [selectedLabel, setSelectedLabel] = useState('');
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState('');

  const handleLabelChange = (event: SelectChangeEvent<string>) => setSelectedLabel(event.target.value);

  const { data: workouts, isLoading } = useQuery(['strength'], getWorkoutsStrength, {
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

  return (
    <Box>
      <>
        <Box className={classes.titleContainer}>
          <Box sx={{ marginLeft: 'auto' }}>
            <FIlterBy selectedLabel={selectedLabel} labels={strengthLabels} workoutsMap={strengthMap} handleLabelChange={handleLabelChange} />
          </Box>
        </Box>
        <Box className={classes.workoutsContainer}>
          {isLoading && <CircularProgress />}
          {filteredWorkouts
            ? filteredWorkouts.map((workout: Workout) => {
                const { id, label, exercises } = workout;
                return (
                  <Box key={id} className={classes.workout}>
                    <Box className={classes.workoutTitle}>
                      <Box>
                        <Typography variant="h6" className={classes.workoutLabel}>
                          {label}
                        </Typography>
                        <Typography variant="subtitle2">{workout?.createdAt ? format(new Date(workout?.createdAt).getTime(), 'dd/MM/yyyy') : ''} </Typography>
                      </Box>
                      <IconButton onClick={() => handleDelete(id)} sx={{ padding: 0 }}>
                        <DeleteForever sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                    <Box className={classes.exercisesListContainer}>
                      <ExercisesList exercises={exercises} showTitle={false} />
                    </Box>
                  </Box>
                );
              })
            : null}
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
