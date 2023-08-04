import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { possibleExercises } from '../../utils/constants';
import { Exercise, Workout } from '../../utils/models';
import { useStyles } from './SelectByExercise.styles';

interface SelectByExerciseProps {
  onChange: (event: SelectChangeEvent) => void;
  value: string;
  options?: string[];
  showExercisesCount: boolean;
}

const SelectByExercise: React.FC<SelectByExerciseProps> = ({ onChange, value, options = possibleExercises, showExercisesCount }) => {
  const { classes } = useStyles();
  const queryClient = useQueryClient();
  const workouts = queryClient.getQueryData(['workouts']) as Workout[];

  const allExercises = workouts && (workouts.flatMap((w) => w.exercises) as Exercise[]);

  const exercisePerTime = allExercises.reduce((acc: { [key: string]: number }, ex) => {
    acc[ex.name] ? acc[ex.name]++ : (acc[ex.name] = 1);
    return acc;
  }, {});

  return (
    <FormControl variant="standard" sx={{ minWidth: 200 }}>
      <InputLabel id="name" sx={{ width: 200 }}>
        exercise
      </InputLabel>
      <Select id="name" name="name" label="name" labelId="name" value={value} onChange={onChange} autoWidth>
        {options.map((ex) => {
          const count = exercisePerTime[ex];
          return (
            <MenuItem key={ex} value={ex} className={classes.menuItem}>
              <span> {ex}</span>
              {showExercisesCount && <span className={count ? classes.count : ''}>{count}</span>}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
export default SelectByExercise;
