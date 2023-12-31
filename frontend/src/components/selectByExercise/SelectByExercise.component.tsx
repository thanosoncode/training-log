import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { strengthExercises } from '../../utils/constants';
import { Exercise, StrengthLabel, StrengthWorkoutServer, Workout } from '../../utils/models';
import { useStyles } from './SelectByExercise.styles';

interface SelectByExerciseProps {
  onChange: (event: SelectChangeEvent) => void;
  value: string;
  options?: string[];
  showExercisesCount: boolean;
  label?: string;
}

const SelectByExercise: React.FC<SelectByExerciseProps> = ({ onChange, value, options, showExercisesCount, label }) => {
  const { classes } = useStyles();
  const queryClient = useQueryClient();
  const strengthWorkouts = queryClient.getQueryData(['strength']) as StrengthWorkoutServer[] | undefined;

  const allExercises = strengthWorkouts ? (strengthWorkouts.flatMap((w) => w.exercises) as Exercise[]) : [];

  const exercisePerTime = allExercises.reduce((acc: { [key: string]: number }, ex) => {
    acc[ex.name] ? acc[ex.name]++ : (acc[ex.name] = 1);
    return acc;
  }, {});

  const filterStrengthExercises = label
    ? strengthExercises.filter((ex) => ex.type.includes(label as StrengthLabel)).map((x) => x.name)
    : strengthExercises.map((x) => x.name);

  const optionsToShow = options ? options : filterStrengthExercises;

  return (
    <FormControl variant="standard" sx={{ minWidth: 200 }}>
      <InputLabel id="name" sx={{ width: 200 }}>
        Exercise
      </InputLabel>
      <Select id="name" name="name" label="name" labelId="name" value={value} onChange={onChange} autoWidth className={classes.select}>
        {optionsToShow.map((ex) => {
          const count = exercisePerTime[ex];
          return (
            <MenuItem key={ex} value={ex} className={classes.menuItem}>
              <span>{ex}</span>
              {showExercisesCount && <span className={count ? classes.count : ''}>{count}</span>}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
export default SelectByExercise;
