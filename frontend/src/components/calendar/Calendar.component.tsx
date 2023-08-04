import { ExpandMore, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Box, IconButton, Paper } from '@mui/material';
import { useState } from 'react';

import { Workout } from '../../utils/models';
import { useStyles } from './Calendar.styles';
import DaysView from './daysView/DaysView.component';
import YearsView from './yearsView/YearsView.component';

interface CalendarProps {
  workouts: Workout[] | undefined;
  setSelectedWorkoutId: React.Dispatch<React.SetStateAction<string>>;
}

const Calendar: React.FC<CalendarProps> = ({ setSelectedWorkoutId, workouts }) => {
  const { classes } = useStyles();
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isYearsOpen, setYearsOpen] = useState(false);

  const getMonthName = (month: number) => {
    switch (month) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';

      default:
        break;
    }
  };

  const handlePreviousMonthClick = () => {
    if (month >= 2) {
      setMonth((m) => m - 1);
      return;
    }
    setMonth(12);
  };

  const handleNextMonthClick = () => {
    if (month < 12) {
      setMonth((m) => m + 1);
      return;
    }
    setMonth(1);
  };

  const toggleYearOptions = () => setYearsOpen(!isYearsOpen);

  const handleYearClick = (year: number) => {
    setYear(year - 1);
    setYearsOpen(false);
  };

  return (
    <Paper className={classes.container}>
      <Box className={classes.header}>
        <Box sx={{ fontWeight: 800 }}>
          {getMonthName(month)} {year}{' '}
          <IconButton onClick={toggleYearOptions} className={isYearsOpen ? classes.expandYearsButton : ''}>
            <ExpandMore />
          </IconButton>
        </Box>
        <Box className={isYearsOpen ? classes.previousNext : ''}>
          <IconButton onClick={handlePreviousMonthClick}>
            <NavigateBefore />
          </IconButton>
          <IconButton onClick={handleNextMonthClick}>
            <NavigateNext />
          </IconButton>
        </Box>
      </Box>
      {isYearsOpen ? (
        <YearsView year={year} handleYearClick={handleYearClick} />
      ) : (
        <DaysView month={month} year={year} workouts={workouts} setSelectedWorkoutId={setSelectedWorkoutId} />
      )}
    </Paper>
  );
};
export default Calendar;
