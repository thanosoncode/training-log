import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import { workoutLabels } from '../../utils/constants';

interface AddLabelProps {
  label: string;
  labelAdded: boolean;
  onChange: (event: SelectChangeEvent<string>) => void;
  onAdd: () => void;
  onGoBack: () => void;
}

const AddLabel: React.FC<AddLabelProps> = (props) => {
  return (
    <Box sx={{ marginTop: 4, marginBottom: 4 }}>
      <Box sx={{ display: 'flex', gap: 4 }}>
        {props.labelAdded ? null : (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography variant="h6">What type of workout is it?</Typography>
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel id="label">Type</InputLabel>
              <Select id="label" label="Age" labelId="label" value={props.label} onChange={props.onChange}>
                {workoutLabels.map((label) => (
                  <MenuItem key={label} value={label}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={props.onAdd} disabled={!props.label}>
              add
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default AddLabel;
