import { Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import theme from '../../theme';
import { Exercise } from '../../utils/models';
import SelectByExercise from '../selectByExercise/SelectByExercise.component';
import { useStyles } from './AddExercise.styles';

interface AddExerciseProps {
  exercises: Exercise[];
  label: string;
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

const AddExercise: React.FC<AddExerciseProps> = (props) => {
  const { classes, cx } = useStyles();
  const emptyExercise = { id: '', name: '', sets: '0', reps: '0', weight: '' };
  const mobileView = useMediaQuery('(max-width:800px)');

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
    props.setExercises([...props.exercises, { ...exercise, id: uuidv4() }]);
    setExercise(emptyExercise);
    setInvalidExercise(false);
  };

  return (
    <Box className={cx({ [classes.rootMobile]: mobileView })}>
      <Typography variant="subtitle1" className={classes.info}>
        {inValidExercise ? 'All fields are required' : ''}
      </Typography>
      <Box className={cx({ [classes.fieldsContainer]: true, [classes.fieldsContainerMobile]: mobileView })}>
        <SelectByExercise value={exercise.name} onChange={handleSelectChange} showExercisesCount={false} label={props.label} />
        <FormControl>
          <TextField
            id="sets"
            name="sets"
            label="Sets"
            variant="outlined"
            type="number"
            value={exercise.sets}
            onChange={handleInputChange}
            inputProps={{ min: 0 }}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="reps"
            name="reps"
            label="Reps"
            variant="outlined"
            type="number"
            value={exercise.reps}
            onChange={handleInputChange}
            inputProps={{ min: 0 }}
          />
        </FormControl>
        <TextField
          id="weight"
          name="weight"
          label="Weight"
          variant="outlined"
          type="number"
          value={exercise.weight}
          onChange={handleInputChange}
          inputProps={{ min: 0 }}
        />
        <Button variant="outlined" onClick={handleAddExercise} className={classes.button}>
          add
        </Button>
      </Box>
    </Box>
  );
};
export default AddExercise;
