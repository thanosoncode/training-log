import Box from '@mui/material/Box';
import { useStyles } from './NewWorkout.styles';
import AddExercise from '../../components/addExercise/AddExercise.component';
import { useState } from 'react';
import { Exercise } from '../../utils/models';
import ExercisesList from '../../components/exerciseList/ExercisesList.component';
import AddWorkoutLabel from '../../components/addWorkoutLabel/AddWorkoutLabel.component';
import { SelectChangeEvent } from '@mui/material/Select';
import { Backdrop, Button, CircularProgress, Typography } from '@mui/material';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { postWorkout } from '../../api/workouts';
import { useNavigate } from 'react-router-dom';

const NewWorkout = () => {
  const { classes } = useStyles();
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const [workoutLabel, setWorkoutLabel] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isWorkoutLabelSelected, setIsWorkoutLabelSelected] = useState(false);

  const handleWorkoutTypeChange = (event: SelectChangeEvent<string>) => {
    setWorkoutLabel(event.target.value);
  };
  const handleWorkoutTypeAdd = () => setIsWorkoutLabelSelected(true);

  const handleRemoveExercise = (id: string) => {
    setExercises(exercises.filter((x) => x.id !== id));
  };

  const { mutate, isLoading: isSavingWorkout } = useMutation(['post-workout'], () => postWorkout({ label: workoutLabel, exercises }), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      setExercises([]);
      setWorkoutLabel('');
      setIsWorkoutLabelSelected(false);
      navigate('/workouts');
    }
  });

  return (
    <Box className={classes.root}>
      {isWorkoutLabelSelected ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Typography variant="h3" sx={{ textTransform: 'capitalize', lineHeight: 'intial' }}>
            {workoutLabel}
          </Typography>
          {exercises.length > 0 && (
            <Button variant="outlined" sx={{ height: 'min-content' }} onClick={() => mutate()}>
              {isSavingWorkout ? 'Saving workout...' : 'Save workout'}
            </Button>
          )}
        </Box>
      ) : (
        <AddWorkoutLabel label={workoutLabel} onChange={handleWorkoutTypeChange} onAdd={handleWorkoutTypeAdd} />
      )}
      {isWorkoutLabelSelected ? (
        <>
          <Box sx={{ marginBottom: '64px' }}>
            <ExercisesList exercises={exercises} showTitle={true} onDelete={handleRemoveExercise} />
          </Box>
          <AddExercise exercises={exercises} setExercises={setExercises} />
        </>
      ) : null}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isSavingWorkout}>
        <CircularProgress color="inherit" title="Saving workout..." />
      </Backdrop>
    </Box>
  );
};
export default NewWorkout;