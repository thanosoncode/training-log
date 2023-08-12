import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useStyles } from './FilterBy.styles';
import Divider from '@mui/material/Divider';

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
      <InputLabel id="filter-by-label">Filter by</InputLabel>
      <Select id="filter-by-label" label="Filter by" labelId="filter-by-label" value={selectedLabel} onChange={handleLabelChange}>
        {filteredLabels &&
          filteredLabels.map((label) => {
            const amount = workoutsMap && workoutsMap[label];
            return (
              <MenuItem key={label} value={label} className={classes.menuItem}>
                <span> {label}</span>
                <span className={amount ? classes.amount : ''}>{amount}</span>
              </MenuItem>
            );
          })}
        <Divider />
        <MenuItem className={classes.clearFilters} value="">
          Clear filters
        </MenuItem>
      </Select>
    </FormControl>
  );
};
export default FIlterBy;
