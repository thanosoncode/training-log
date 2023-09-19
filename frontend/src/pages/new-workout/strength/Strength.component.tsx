import Box from '@mui/material/Box';
import { useStyles } from './Strength.styles';
import AddExercise from '../../../components/addExercise/AddExercise.component';
import { useState } from 'react';
import { Exercise } from '../../../utils/models';
import ExercisesList from '../../../components/exerciseList/ExercisesList.component';
import { SelectChangeEvent } from '@mui/material/Select';
import { Backdrop, Button, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postWorkoutStrength } from '../../../api/workouts';
import { useNavigate } from 'react-router-dom';
import { strengthLabels } from '../../../utils/constants';
import AddLabel from '../../../components/addLabel/AddLabel.component';
import { useAppState } from '../../../context/AppContext';

const NewStrength = () => {
  const { classes, cx } = useStyles();
  const queryClient = useQueryClient();
  const { user } = useAppState();
  const navigate = useNavigate();
  const [workoutLabel, setWorkoutLabel] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const mobileView = useMediaQuery('(max-width:800px)');

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
    <Box className={cx({ [classes.mobileRoot]: mobileView })}>
      {workoutLabel ? (
        <Box className={classes.labelHeader}>
          <Typography variant={mobileView ? 'h5' : 'h4'} className={classes.label}>
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
          <Box className={cx({ [classes.exercisesListContainer]: true, [classes.exercisesListContainerMobile]: mobileView })}>
            <ExercisesList exercises={exercises} showTitle={true} onDelete={handleRemoveExercise} />
          </Box>
          {exercises.length > 0 ? (
            <Typography className={classes.message}>Keep going!</Typography>
          ) : (
            <Typography className={classes.message}>Add exercises to create your workout!</Typography>
          )}
          <Box className={classes.addExerciseContainer}>
            <AddExercise exercises={exercises} setExercises={setExercises} label={workoutLabel} />
          </Box>
        </>
      ) : null}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isSavingWorkout}>
        <CircularProgress color="inherit" title="Saving workout..." />
      </Backdrop>
    </Box>
  );
};
export default NewStrength;
