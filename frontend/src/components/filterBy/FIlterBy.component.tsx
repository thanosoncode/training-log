import { Tune } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useQueryClient } from '@tanstack/react-query';

import theme from '../../theme';
import { workoutLabels } from '../../utils/constants';
import { Workout } from '../../utils/models';
import { useStyles } from './FilterBy.styles';

interface FilterByProps {
  filtersOpen: boolean;
  selectedLabel: string;
  handleLabelChange: (event: SelectChangeEvent<string>) => void;
  handleFilterByOpen: () => void;
}

const FIlterBy: React.FC<FilterByProps> = ({ handleLabelChange, selectedLabel, filtersOpen, handleFilterByOpen }) => {
  const { classes } = useStyles();
  const queryClient = useQueryClient();
  const workouts = queryClient.getQueryData(['workouts']) as Workout[];

  const timesPerWorkout =
    workouts &&
    workouts.reduce((acc: { [key: string]: number }, workout) => {
      if (acc[workout.label]) {
        acc[workout.label]++;
      } else {
        acc[workout.label] = 1;
      }
      return acc;
    }, {});

  return (
    <>
      <IconButton onClick={handleFilterByOpen}>
        <Tune sx={{ color: selectedLabel ? theme.palette.primary.main : '' }} />
      </IconButton>
      {filtersOpen ? (
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel id="filter-by-label">Filter by</InputLabel>
          <Select id="filter-by-label" label="Filter by" labelId="filter-by-label" value={selectedLabel} onChange={handleLabelChange}>
            {workoutLabels.map((label) => {
              const amount = timesPerWorkout[label];
              return (
                <MenuItem key={label} value={label} className={classes.menuItem}>
                  <span> {label}</span>
                  <span className={amount ? classes.amount : ''}>{amount}</span>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ) : null}
    </>
  );
};
export default FIlterBy;
