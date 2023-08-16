import { ExpandMore, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Box, IconButton, Paper } from '@mui/material';
import { useState } from 'react';

import { CardioWorkoutFromServer, StrengthWorkoutServer } from '../../utils/models';
import { useStyles } from './Calendar.styles';
import DaysView from './daysView/DaysView.component';
import YearsView from './yearsView/YearsView.component';
import { useAppDispatch, useAppState } from '../../context/AppContext';

interface CalendarProps {}

const Calendar: React.FC<CalendarProps> = () => {
  const { classes } = useStyles();
  const { month, year } = useAppState();
  const appDispatch = useAppDispatch();
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
      appDispatch({ type: 'MONTH_DECREASE' });

      return;
    }
    appDispatch({ type: 'SET_MONTH', payload: 12 });
  };

  const handleNextMonthClick = () => {
    if (month < 12) {
      appDispatch({ type: 'MONTH_INCREASE' });
      return;
    }
    appDispatch({ type: 'SET_MONTH', payload: 1 });
  };

  const toggleYearOptions = () => setYearsOpen(!isYearsOpen);

  const handleYearClick = (year: number) => {
    console.log('year', year);
    appDispatch({ type: 'SET_YEAR', payload: year });
    setYearsOpen(false);
  };

  return (
    <Paper className={classes.container} sx={{ boxShadow: 3 }}>
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
      {isYearsOpen ? <YearsView handleYearClick={handleYearClick} /> : <DaysView />}
    </Paper>
  );
};
export default Calendar;
