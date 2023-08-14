import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, SelectChangeEvent } from '@mui/material';

interface AddStrengthLabelProps {
  title: string;
  label: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  labels: string[];
}

const AddLabel: React.FC<AddStrengthLabelProps> = (props) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant="h6">{props.title}</Typography>
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel id="label">Type</InputLabel>
            <Select id="label" label="Age" labelId="label" value={props.label} onChange={props.onChange}>
              {props.labels.map((label) => (
                <MenuItem key={label} value={label} sx={{ textTransform: 'capitalize' }}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};
export default AddLabel;
