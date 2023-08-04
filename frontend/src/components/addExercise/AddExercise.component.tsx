import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import theme from '../../theme';
import { Exercise } from '../../utils/models';
import SelectByExercise from '../selectByExercise/SelectByExercise.component';

interface AddExerciseProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

const AddExercise: React.FC<AddExerciseProps> = (props) => {
  const emptyExercise = { name: '', sets: '0', reps: '0', weight: '' };

  const [exercise, setExercise] = useState<Exercise>(emptyExercise);
  const [inValidExercise, setInvalidExercise] = useState(false);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setExercise({
      ...exercise,
      [event.target.name]: event.target.value.toString()
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setExercise({
      ...exercise,
      [event.target.name]: event.target.value.toString()
    });
  };

  const handleAddExercise = () => {
    const exerciseIsValid = exercise.sets !== '0' && exercise.reps !== '0' && exercise.name !== '' && exercise.weight !== '';
    if (!exerciseIsValid) {
      setInvalidExercise(true);
      return;
    }

    props.setExercises([...props.exercises, exercise]);
    setExercise(emptyExercise);
    setInvalidExercise(false);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ marginTop: 4, color: theme.palette.warning.main }}>
        {inValidExercise ? 'All fields are required' : ''}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          marginTop: 2,
          marginBottom: 3,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
        <SelectByExercise value={exercise.name} onChange={handleSelectChange} showExercisesCount={false} />
        <FormControl>
          <InputLabel id="sets">sets</InputLabel>
          <Select id="sets" name="sets" label="sets" labelId="sets" value={exercise?.sets} onChange={handleSelectChange}>
            {new Array(11).fill(null).map((_, index) => (
              <MenuItem key={index} value={index.toString()}>
                {index.toString()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="reps">reps</InputLabel>
          <Select id="reps" name="reps" label="reps" labelId="reps" value={exercise?.reps} onChange={handleSelectChange}>
            {new Array(21).fill(null).map((_, index) => (
              <MenuItem key={index} value={index.toString()}>
                {index.toString()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="weight"
          name="weight"
          label="weight"
          variant="outlined"
          type="number"
          value={exercise.weight}
          onChange={handleInputChange}
          inputProps={{ min: 0 }}
        />
        <Button variant="outlined" onClick={handleAddExercise}>
          add
        </Button>
      </Box>
    </Box>
  );
};
export default AddExercise;
