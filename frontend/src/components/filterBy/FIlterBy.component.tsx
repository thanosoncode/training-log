import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useStyles } from './FilterBy.styles';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

interface FilterByProps {
  selectedLabel: string;
  handleLabelChange: (event: SelectChangeEvent<string>) => void;
  labels: string[];
  workoutsMap: { [key: string]: number } | undefined;
}

const FIlterBy: React.FC<FilterByProps> = ({ handleLabelChange, selectedLabel, labels, workoutsMap }) => {
  const { classes } = useStyles();

  const filteredLabels = workoutsMap && labels.filter((label) => Object.keys(workoutsMap).includes(label));

  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <InputLabel id="filter-by-label">Filter by type</InputLabel>
      <Select id="filter-by-label" label="Filter by" labelId="filter-by-label" value={selectedLabel} onChange={handleLabelChange} className={classes.select}>
        {filteredLabels &&
          filteredLabels.map((label) => {
            const amount = workoutsMap && workoutsMap[label];
            return (
              <MenuItem key={label} value={label} className={classes.menuItem}>
                <Typography>{label}</Typography>
                <Typography className={amount ? classes.amount : ''}>{amount}</Typography>
              </MenuItem>
            );
          })}
        <Divider />
        <MenuItem className={classes.clearFilters} value="" selected={false}>
          Clear filters
        </MenuItem>
      </Select>
    </FormControl>
  );
};
export default FIlterBy;
