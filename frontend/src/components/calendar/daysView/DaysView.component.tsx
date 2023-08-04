import Box from '@mui/material/Box';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import { Workout } from '../../../utils/models';
import { useStyles } from './DaysView.styles';

interface DaysViewProps {
  year: number;
  month: number;
  workouts: Workout[] | undefined;
  setSelectedWorkoutId: React.Dispatch<React.SetStateAction<string>>;
}

const DaysView: React.FC<DaysViewProps> = ({ year, month, workouts, setSelectedWorkoutId }) => {
  const { classes, cx } = useStyles();

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
  const [days, setDays] = useState<{ id: string; day: string; label: '' }[]>(new Array(getDaysInMonth(year, month)).fill({ id: '', day: '', label: '' }));

  const handleDayClick = (id: string) => {
    setSelectedWorkoutId(id);
  };

  useEffect(() => {
    if (workouts) {
      const newDays = new Array(getDaysInMonth(year, month)).fill({
        id: '',
        day: ''
      });
      const entries = workouts
        .map((w) => {
          if (!w.createdAt) return;
          const date = format(new Date(w.createdAt).getTime(), 'dd/MM/yyyy');
          const [day, month, year] = date.split('/');
          const entry = {
            id: w.id ?? '',
            day: Number(day),
            month: Number(month),
            year: Number(year),
            label: w.label
          };
          return entry;
        })
        .filter((item) => item && item.month === month && item.year === year);
      entries.forEach((entry) => {
        if (!entry) return;
        newDays.splice(entry.day - 1, 1, entry);
      });
      setDays(newDays);
    }
  }, [workouts, month, year]);

  const getWhatDayIsTheFirst = (year: number, month: number) => {
    return new Date(year, month - 1, 1).toString().split(' ')[0];
  };

  const getEmptyCells = (day: string) => {
    switch (day) {
      case 'Sun':
        return 0;
      case 'Mon':
        return 1;
      case 'Tue':
        return 2;
      case 'Wed':
        return 3;
      case 'Thu':
        return 4;
      case 'Fri':
        return 5;
      case 'Sat':
        return 6;
      default:
        return 0;
    }
  };

  return (
    <Box className={classes.days}>
      <span>S</span>
      <span>M</span>
      <span>T</span>
      <span>W</span>
      <span>T</span>
      <span>F</span>
      <span>S</span>
      {new Array(getEmptyCells(getWhatDayIsTheFirst(year, month))).fill(null).map((_, index) => (
        <span key={index}></span>
      ))}
      {days.map((day, index) => (
        <Box
          key={index + 1}
          onClick={() => handleDayClick(day.id)}
          className={cx({
            [classes.day]: true,
            [classes.dayActive]: day.day.toString().length > 0
          })}>
          <span> {index + 1}</span>
          <span className={classes.label}>{day.label}</span>
        </Box>
      ))}
    </Box>
  );
};
export default DaysView;
