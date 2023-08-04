import { makeStyles } from 'tss-react/mui';

import theme from '../../theme';

export const useStyles = makeStyles()(() => ({
  newWorkoutButton: { height: 'min-content', marginLeft: 'auto' },
  titleContainer: {
    display: 'flex',
    justifyContent: 'cetner',
    alignItems: 'center',
    gap: '16px',
    margin: theme.spacing(3, 0, 4, 0),
    height: 40,
    padding: theme.spacing(0, 1)
  },
  title: {
    margin: theme.spacing(2, 0)
  },
  workoutsContainer: {
    display: 'flex',
    gap: '48px',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  workout: { width: 380 },
  workoutTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '4px'
  },
  workoutLabel: {
    textTransform: 'capitalize'
  },
  exercisesListContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '36px'
  }
}));
