import Box from '@mui/material/Box';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import { CardioWorkoutFromServer, StrengthWorkoutServer } from '../../../utils/models';
import { useStyles } from './DaysView.styles';
import { cardioLabels } from '../../../utils/constants';
import { useAppDispatch, useAppState } from '../../../context/AppContext';
import DayItem from './dayItem/DayItem.component';
import { useQueryClient } from '@tanstack/react-query';

type Entry = {
  id: string;
  day: number;
  month: number;
  year: number;
  label: string;
};

export type CombinedEntryWorkout = { id: string; month: number; year: number; label: string };

export type CombinedEntry = {
  day: number;
  workouts: CombinedEntryWorkout[];
};

interface DaysViewProps {}

const DaysView: React.FC<DaysViewProps> = () => {
  const { classes, cx } = useStyles();
  const appDispatch = useAppDispatch();
  const { year, month } = useAppState();

  const queryClient = useQueryClient();
  const cardio = queryClient.getQueryData(['cardio', month, year]) as CardioWorkoutFromServer[];
  const strength = queryClient.getQueryData(['strength', month, year]) as StrengthWorkoutServer[];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
  const [days, setDays] = useState<CombinedEntry[]>(new Array(getDaysInMonth(year, month)).fill({ day: 0, workouts: [] }));

  const handleDayClick = (workout: CombinedEntryWorkout) => {
    const isCardioWorkout = cardioLabels.includes(workout.label);
    if (isCardioWorkout) {
      appDispatch({ type: 'SET_SELECTED_CARDIO_ID', payload: workout.id });
    } else {
      appDispatch({ type: 'SET_SELECTED_STRENGTH_ID', payload: workout.id });
    }
  };

  const strengthWorkoutMap = (strengthWorkouts: StrengthWorkoutServer[]): Entry[] => {
    if (!strengthWorkouts) {
      return [];
    }
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
    if (!cardioWorkouts) {
      return [];
    }
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

    const entriesStrength = strengthWorkoutMap(strength);

    createCombineEntriesStrength(entriesStrength).forEach((entry) => {
      newDays.splice(entry.day - 1, 1, entry);
    });

    const entriesCardio = cardioWorkoutMap(cardio);

    createCombineEntriesCardio(entriesCardio).forEach((entry) => {
      if (newDays[entry.day - 1].day === '') {
        newDays.splice(entry.day - 1, 1, entry);
      } else {
        newDays[entry.day - 1].workouts.push(...entry.workouts);
      }
    });
    setDays(newDays);
  }, [cardio, strength, month, year]);

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
      {days.map((entry, index) => (
        <DayItem key={index} index={index} entry={entry} handleDayClick={handleDayClick} />
      ))}
    </Box>
  );
};
export default DaysView;
