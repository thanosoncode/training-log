import { Box, Theme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { makeStyles } from 'tss-react/mui';

import theme from '../../theme';
import { Exercise, Workout } from '../../utils/models';

interface ExercisesListProps {
  exercises: Exercise[];
  workout?: Workout | null;
  showTitle: boolean;
}

const ExercisesList: React.FC<ExercisesListProps> = ({ exercises, workout, showTitle }) => {
  const { classes } = useStyles();
  return (
    <>
      {showTitle && (
        <Box className={classes.workoutTitle}>
          <Typography variant="subtitle2" sx={{ paddingLeft: theme.spacing(1) }}>
            {workout?.createdAt ? format(new Date(workout?.createdAt).getTime(), 'dd/MM/yyyy') : ''}{' '}
          </Typography>
          <Typography variant="h6" className={classes.workoutLabel}>
            {workout?.label}
          </Typography>
        </Box>
      )}
      {exercises && exercises.length > 0 ? (
        <TableContainer component={Paper} sx={{ height: 'min-content' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: theme.palette.text.secondary }}>name</TableCell>
                <TableCell className={classes.headCell}>sets</TableCell>
                <TableCell className={classes.headCell}>reps</TableCell>
                <TableCell className={classes.headCell}>weight</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exercises.map((ex, index) => (
                <TableRow key={index}>
                  <TableCell className={classes.cellName}>{ex.name}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{ex.sets}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{ex.reps}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{ex.weight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
};
export default ExercisesList;

export const useStyles = makeStyles()((theme: Theme) => ({
  workoutTitle: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '4px'
  },
  workoutLabel: {
    textTransform: 'capitalize',
    marginLeft: theme.spacing(7)
  },
  headCell: { color: theme.palette.text.secondary, textAlign: 'center' },
  cellName: { fontWeight: 500 }
}));
