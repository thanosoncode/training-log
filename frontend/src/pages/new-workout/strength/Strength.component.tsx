import Box from '@mui/material/Box';
import { useStyles } from './Strength.styles';
import AddExercise from '../../../components/addExercise/AddExercise.component';
import { useState } from 'react';
import { Exercise } from '../../../utils/models';
import ExercisesList from '../../../components/exerciseList/ExercisesList.component';
import { SelectChangeEvent } from '@mui/material/Select';
import { Backdrop, Button, CircularProgress, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postWorkoutStrength } from '../../../api/workouts';
import { useNavigate } from 'react-router-dom';
import { strengthLabels } from '../../../utils/constants';
import AddLabel from '../../../components/addLabel/AddLabel.component';
import { useAppState } from '../../../context/AppContext';

const NewStrength = () => {
  const { classes } = useStyles();
  const queryClient = useQueryClient();
  const { user } = useAppState();
  const navigate = useNavigate();
  const [workoutLabel, setWorkoutLabel] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const handleWorkoutTypeChange = (event: SelectChangeEvent<string>) => {
    setWorkoutLabel(event.target.value);
  };

  const handleRemoveExercise = (id: string) => {
    setExercises(exercises.filter((x) => x.id !== id));
  };

  const { mutate, isLoading: isSavingWorkout } = useMutation(
    ['create-strength'],
    () => postWorkoutStrength({ label: workoutLabel, exercises, userId: user?.id ?? '' }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['strength'] });
        setExercises([]);
        setWorkoutLabel('');
        navigate('/workouts/strength');
      }
    }
  );

  return (
    <Box className={classes.root}>
      {workoutLabel ? (
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
        <AddLabel title="What type of strength workout" label={workoutLabel} labels={strengthLabels} onChange={handleWorkoutTypeChange} />
      )}
      {workoutLabel ? (
        <>
          <Box sx={{ marginBottom: '64px' }}>
            <ExercisesList exercises={exercises} showTitle={true} onDelete={handleRemoveExercise} />
          </Box>
          {exercises.length > 0 ? <Typography>Keep going!</Typography> : <Typography>Add exercises to create your workout!</Typography>}
          <AddExercise exercises={exercises} setExercises={setExercises} label={workoutLabel} />
        </>
      ) : null}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isSavingWorkout}>
        <CircularProgress color="inherit" title="Saving workout..." />
      </Backdrop>
    </Box>
  );
};
export default NewStrength;
