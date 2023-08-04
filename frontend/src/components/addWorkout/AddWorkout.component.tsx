import { Box, SelectChangeEvent, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { postWorkout } from '../../api/workouts';
import { Exercise } from '../../utils/models';
import AddExercise from '../addExercise/AddExercise.component';
import AddLabel from '../addLabel/AddLabel.component';
import Controls from '../controls/Controls.component';
import ExercisesList from '../exerciseList/ExercisesList.component';

interface AddWorkoutProps {
  setisAddWorkoutOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddWorkout: React.FC<AddWorkoutProps> = ({ setisAddWorkoutOpen }) => {
  const queryClient = useQueryClient();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [doneWithExercises, setDoneWithExercises] = useState(false);
  const [label, setLabel] = useState('');
  const [labelAdded, setLabelAdded] = useState(false);
  const workoutIsReady = labelAdded && exercises.length > 0;

  const handleLabelAdded = () => setLabelAdded(true);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setLabel(event.target.value);
  };

  const { mutate, isLoading: isSavingWorkout } = useMutation(['post-workout'], () => postWorkout({ label, exercises }), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      setisAddWorkoutOpen(false);
    }
  });

  const handleGoBack = () => {
    if (label) {
      setLabel('');
      setLabelAdded(false);
      return;
    }
    setDoneWithExercises(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Add workout
      </Typography>
      <ExercisesList exercises={exercises} showTitle={false} />
      {labelAdded ? (
        <Typography sx={{ marginTop: 4 }} variant="h5">
          {label.toUpperCase()}
        </Typography>
      ) : null}
      {doneWithExercises ? (
        <AddLabel label={label} labelAdded={labelAdded} onChange={handleChange} onAdd={handleLabelAdded} onGoBack={handleGoBack} />
      ) : (
        <AddExercise exercises={exercises} setExercises={setExercises} />
      )}

      <Controls
        doneWithExercises={doneWithExercises}
        workoutIsReady={workoutIsReady}
        isSavingWorkout={isSavingWorkout}
        setDoneWithExercises={setDoneWithExercises}
        exercises={exercises}
        handleGoBack={handleGoBack}
        mutate={mutate}
      />
    </Box>
  );
};
export default AddWorkout;
