import { Add } from '@mui/icons-material';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { Box, Button, IconButton, SelectChangeEvent, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';

import { deleteWorkout, getWorkouts } from '../../api/workouts';
import AddWorkout from '../../components/addWorkout/AddWorkout.component';
import ConfirmationDialog from '../../components/confirmationDialog/ConfirmationDialog.component';
import ExercisesList from '../../components/exerciseList/ExercisesList.component';
import FIlterBy from '../../components/filterBy/FIlterBy.component';
import theme from '../../theme';
import { LONG_CACHE } from '../../utils/constants';
import { Workout } from '../../utils/models';
import { useStyles } from './Workouts.styles';

const Workouts = () => {
  const { classes } = useStyles();
  const queryClient = useQueryClient();
  const [selectedLabel, setSelectedLabel] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isAddWorkoutOpen, setisAddWorkoutOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState('');

  const handleLabelChange = (event: SelectChangeEvent<string>) => setSelectedLabel(event.target.value);

  const handleFilterByOpen = () => {
    setSelectedLabel('');
    setFiltersOpen(!filtersOpen);
  };

  const handleIsAddWorkoutOpen = () => setisAddWorkoutOpen(true);

  const { data: workouts, isLoading } = useQuery(['workouts'], getWorkouts, {
    refetchOnWindowFocus: false,
    staleTime: LONG_CACHE
  });

  const { mutate: deleteSelectedWorkout, isLoading: isDeleting } = useMutation(['delete-workout'], deleteWorkout, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workouts'] })
  });

  const handleDelete = (id: string | undefined) => {
    if (id) {
      setWorkoutToDelete(id);
      setIsConfirmationDialogOpen(true);
    }
  };

  const handleDeleteAction = (confirm: boolean) => {
    console.log('handleDeleteAction');
    if (confirm && workoutToDelete) {
      deleteSelectedWorkout(workoutToDelete);
      setIsConfirmationDialogOpen(false);
    }
    setIsConfirmationDialogOpen(false);
  };

  const filteredWorkouts = selectedLabel ? workouts && workouts.filter((w) => w.label === selectedLabel) : workouts;

  return (
    <Box>
      {isAddWorkoutOpen && <AddWorkout setisAddWorkoutOpen={setisAddWorkoutOpen} />}
      {!isAddWorkoutOpen && (
        <>
          <Box className={classes.titleContainer}>
            <FIlterBy filtersOpen={filtersOpen} selectedLabel={selectedLabel} handleFilterByOpen={handleFilterByOpen} handleLabelChange={handleLabelChange} />
            {!isAddWorkoutOpen && (
              <Button variant="contained" onClick={handleIsAddWorkoutOpen} className={classes.newWorkoutButton}>
                <Add />
              </Button>
            )}
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
      )}

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isDeleting}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ConfirmationDialog open={isConfirmationDialogOpen} onAction={handleDeleteAction} />
    </Box>
  );
};
export default Workouts;
