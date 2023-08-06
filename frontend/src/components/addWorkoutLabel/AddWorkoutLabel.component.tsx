import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, SelectChangeEvent } from '@mui/material';
import { workoutLabels } from '../../utils/constants';

interface AddWorkoutLabelProps {
  label: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  onAdd: () => void;
}

const AddWorkoutLabel: React.FC<AddWorkoutLabelProps> = (props) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant="h6">What kind of workout?</Typography>
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel id="label">Type</InputLabel>
            <Select id="label" label="Age" labelId="label" value={props.label} onChange={props.onChange}>
              {workoutLabels.map((label) => (
                <MenuItem key={label} value={label} sx={{ textTransform: 'capitalize' }}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={props.onAdd} disabled={!props.label} sx={{ height: '100%' }}>
            add
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default AddWorkoutLabel;
