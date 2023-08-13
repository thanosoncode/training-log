import Box from '@mui/material/Box';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import { CardioWorkoutFromServer, StrengthWorkoutServer, Workout } from '../../../utils/models';
import { useStyles } from './DaysView.styles';
import Tooltip from '@mui/material/Tooltip';
import { cardioLabels } from '../../../utils/constants';

type Entry = {
  id: string;
  day: number;
  month: number;
  year: number;
  label: string;
};

type CombinedEntryWorkout = { id: string; month: number; year: number; label: string };

type CombinedEntry = {
  day: number;
  workouts: CombinedEntryWorkout[];
};

interface DaysViewProps {
  year: number;
  month: number;
  strengthWorkouts: StrengthWorkoutServer[];
  cardioWorkouts: CardioWorkoutFromServer[];
  setSelectedStrengthId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCardioId: React.Dispatch<React.SetStateAction<string>>;
}

const DaysView: React.FC<DaysViewProps> = ({ year, month, strengthWorkouts, setSelectedStrengthId, setSelectedCardioId, cardioWorkouts }) => {
  const { classes, cx } = useStyles();

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
  const [days, setDays] = useState<CombinedEntry[]>(new Array(getDaysInMonth(year, month)).fill({ day: 0, workouts: [] }));

  const handleDayClick = (workout: CombinedEntryWorkout) => {
    const isCardioWorkout = cardioLabels.includes(workout.label);
    if (isCardioWorkout) {
      setSelectedCardioId(workout.id);
    } else {
      setSelectedStrengthId(workout.id);
    }
  };

  const strengthWorkoutMap = (strengthWorkouts: StrengthWorkoutServer[]): Entry[] => {
    const entries = strengthWorkouts
      .map((w) => {
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

    return entries;
  };

  const createCombineEntriesStrength = (entries: Entry[]) => {
    const combinedEntries = entries.reduce((acc: CombinedEntry[], entry: Entry) => {
      const workout = { id: entry.id, month: entry.month, year: entry.year, label: entry.label };
      const existingEntry = acc.find((item) => item.day === entry.day);

      if (!existingEntry) {
        acc.push({ day: entry.day, workouts: [workout] });
      } else {
        existingEntry.workouts.push(workout);
      }

      return acc;
    }, []);
    return combinedEntries;
  };

  const cardioWorkoutMap = (cardioWorkouts: CardioWorkoutFromServer[]): Entry[] => {
    const entries = cardioWorkouts
      .map((w) => {
        const date = format(new Date(w.createdAt).getTime(), 'dd/MM/yyyy');
        const [day, month, year] = date.split('/');
        const entry = {
          id: w.id ?? '',
          day: Number(day),
          month: Number(month),
          year: Number(year),
          label: w.exercise.name
        };
        return entry;
      })
      .filter((item) => item && item.month === month && item.year === year);

    return entries;
  };

  const createCombineEntriesCardio = (entries: Entry[]) => {
    const combinedEntries = entries.reduce((acc: CombinedEntry[], entry: Entry) => {
      const workout = { id: entry.id, month: entry.month, year: entry.year, label: entry.label };
      const existingEntry = acc.find((item) => item.day === entry.day);

      if (!existingEntry) {
        acc.push({ day: entry.day, workouts: [workout] });
      } else {
        existingEntry.workouts.push(workout);
      }

      return acc;
    }, []);
    return combinedEntries;
  };

  useEffect(() => {
    const newDays = new Array(getDaysInMonth(year, month)).fill({
      id: '',
      day: ''
    });

    const entriesStrength = strengthWorkoutMap(strengthWorkouts);

    createCombineEntriesStrength(entriesStrength).forEach((entry) => {
      newDays.splice(entry.day - 1, 1, entry);
    });

    const entriesCardio = cardioWorkoutMap(cardioWorkouts);

    createCombineEntriesCardio(entriesCardio).forEach((entry) => {
      if (newDays[entry.day - 1].day === '') {
        newDays.splice(entry.day - 1, 1, entry);
      } else {
        newDays[entry.day - 1].workouts.push(...entry.workouts);
      }
    });
    console.log('newDays', newDays);
    setDays(newDays);
  }, [strengthWorkouts, cardioWorkouts, month, year]);

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
      <span className={classes.daysName}>S</span>
      <span className={classes.daysName}>M</span>
      <span className={classes.daysName}>T</span>
      <span className={classes.daysName}>W</span>
      <span className={classes.daysName}>T</span>
      <span className={classes.daysName}>F</span>
      <span className={classes.daysName}>S</span>
      {new Array(getEmptyCells(getWhatDayIsTheFirst(year, month))).fill(null).map((_, index) => (
        <span key={index}></span>
      ))}
      {days.map((day, index) => (
        <Tooltip
          classes={{ tooltip: classes.tooltipContainer }}
          title={
            <div className={classes.tooltip}>
              {day.workouts &&
                day.workouts.map((workout, index) => (
                  <div key={index} onClick={() => handleDayClick(workout)} className={classes.tooltipItem}>
                    {workout.label}
                  </div>
                ))}
            </div>
          }
          key={index + 1}
          className={cx({
            [classes.day]: true,
            [classes.dayActive]: day.day.toString().length > 0
          })}>
          <span>{index + 1}</span>
        </Tooltip>
      ))}
    </Box>
  );
};
export default DaysView;
