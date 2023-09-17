import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { STRENGTH_WORKOUTS_TITLE_WIDTH } from '../../../utils/constants';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {},
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    margin: theme.spacing(3, 'auto', 8, 'auto'),
    height: 40,
    padding: theme.spacing(0, 1),
    width: STRENGTH_WORKOUTS_TITLE_WIDTH
  },
  titleContainerMobile: {
    width: 'auto'
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
  workoutDate: { opacity: 0.6 },
  exercisesListContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '36px'
  },
  monthButton: { textTransform: 'none', color: 'inherit' },
  monthButtonActive: { color: theme.palette.primary.main },
  buttonsContainer: { marginLeft: 'auto', display: 'flex', alignItems: 'flex-end', justifyItems: 'center', gap: '16px' },
  buttonsContainerMobile: { alignItems: 'center', margin: '0 auto' }
}));
