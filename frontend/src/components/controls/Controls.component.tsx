import { Box, Button } from '@mui/material';
import { UseMutateFunction } from '@tanstack/react-query';

import { Exercise } from '../../utils/models';

interface ControlsProps {
  doneWithExercises: boolean;
  workoutIsReady: boolean;
  isSavingWorkout: boolean;
  setDoneWithExercises: React.Dispatch<React.SetStateAction<boolean>>;
  exercises: Exercise[];
  handleGoBack: () => void;
  mutate: UseMutateFunction<any, unknown, void, unknown>;
}

const Controls: React.FC<ControlsProps> = ({ doneWithExercises, setDoneWithExercises, exercises, workoutIsReady, isSavingWorkout, mutate, handleGoBack }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '25%' }}>
      {!doneWithExercises && (
        <Button variant="contained" disabled={exercises.length === 0} onClick={() => setDoneWithExercises(true)}>
          done with exercises
        </Button>
      )}
      {workoutIsReady ? (
        <Button variant="contained" disabled={isSavingWorkout} onClick={() => mutate()}>
          {isSavingWorkout ? 'Saving...' : 'Save workout'}
        </Button>
      ) : null}
      {doneWithExercises && (
        <Button variant="text" onClick={handleGoBack}>
          go back
        </Button>
      )}
    </Box>
  );
};
export default Controls;
