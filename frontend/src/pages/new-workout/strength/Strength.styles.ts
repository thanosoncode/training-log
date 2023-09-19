import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  mobileRoot: {},
  labelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: theme.spacing(0, 5) },
  label: { textTransform: 'capitalize', lineHeight: 'intial' },
  addExerciseContainer: { padding: theme.spacing(0, 5) },
  exercisesListContainer: { margin: '32px 40px 0px 40px' },
  exercisesListContainerMobile: { margin: '0px 0px 32px 0px' },
  message: { marginBottom: '24px', padding: '0px 40px' }
}));
