import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, SelectChangeEvent } from '@mui/material';
import { useStyles } from './AddLabel.styles';

interface AddStrengthLabelProps {
  title: string;
  label: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  labels: string[];
}

const AddLabel: React.FC<AddStrengthLabelProps> = (props) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.root}>
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
  );
};
export default AddLabel;
