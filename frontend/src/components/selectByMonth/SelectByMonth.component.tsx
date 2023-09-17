import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Divider, Theme } from '@mui/material';
import { MONTHS } from '../../utils/constants';
import { CardioWorkoutFromServer, StrengthWorkoutServer } from '../../utils/models';
import { makeStyles } from 'tss-react/mui';

interface SelectByMonthProps {
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  workouts: StrengthWorkoutServer[] | CardioWorkoutFromServer[] | undefined;
  selectedMonth: string;
}

const SelectByMonth: React.FC<SelectByMonthProps> = ({ setSelectedMonth, selectedMonth, workouts }) => {
  const { classes } = useStyles();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ minWidth: 160 }}>
      <InputLabel id="month" sx={{ width: 160 }}>
        Month
      </InputLabel>
      <Select id="month" label="Month" labelId="month" value={selectedMonth} onChange={handleChange} className={classes.select}>
        {MONTHS.map((month) => {
          const amountPerMonth = workouts ? workouts.filter((w) => new Date(w.createdAt).getMonth() + 1 === month.value).length : null;
          return (
            <MenuItem key={month.name} value={month.value} className={classes.menuItem}>
              {month.name}
              {amountPerMonth !== 0 ? <span className={classes.amount}>{amountPerMonth}</span> : null}
            </MenuItem>
          );
        })}
        <Divider />
        <MenuItem value="">Clear selection</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectByMonth;

const useStyles = makeStyles()((theme: Theme) => ({
  select: { '& > div': { display: 'flex', gap: '24px' } },
  menuItem: { display: 'flex', justifyContent: 'space-between', gap: '8px' },
  amount: {
    width: 18,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    color: 'inherit',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'bolder'
  }
}));
