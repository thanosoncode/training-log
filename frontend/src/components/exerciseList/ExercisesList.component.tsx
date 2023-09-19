import { Box, Theme, useMediaQuery } from '@mui/material';
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
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

interface ExercisesListProps {
  exercises: Exercise[];
  workout?: Workout | null;
  showTitle: boolean;
  onDelete?: (id: string) => void;
  colorLabel?: boolean;
}

const ExercisesList: React.FC<ExercisesListProps> = ({ exercises, workout, showTitle, onDelete, colorLabel }) => {
  const { classes, cx } = useStyles();
  const mobileView = useMediaQuery('(max-width:800px)');

  return (
    <>
      {showTitle && (
        <Box className={classes.workoutTitle}>
          <Typography variant="subtitle2" sx={{ paddingLeft: theme.spacing(1) }}>
            {workout?.createdAt ? format(new Date(workout?.createdAt).getTime(), 'dd/MM/yyyy') : ''}{' '}
          </Typography>
          <Typography variant="h6" className={cx({ [classes.workoutLabel]: true, [classes.colorLabel]: colorLabel })}>
            {workout?.label}
          </Typography>
        </Box>
      )}
      {exercises && exercises.length > 0 ? (
        <TableContainer component={Paper} sx={{ height: 'min-content', border: '1px solid #464646' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: theme.palette.text.secondary }} className={cx({ [classes.headCellMobile]: mobileView })}>
                  Exercise
                </TableCell>
                <TableCell className={cx({ [classes.headCell]: true, [classes.headCellMobile]: mobileView })}>Sets</TableCell>
                <TableCell className={cx({ [classes.headCell]: true, [classes.headCellMobile]: mobileView })}>Reps</TableCell>
                <TableCell className={cx({ [classes.headCell]: true, [classes.headCellMobile]: mobileView })}>Weight</TableCell>
                {onDelete && <TableCell className={cx({ [classes.headCell]: true, [classes.headCellMobile]: mobileView })}>Remove</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {exercises.map((exercise) => (
                <TableRow key={exercise.id}>
                  <TableCell sx={{ fontSize: '16px' }} className={cx({ [classes.cellName]: true, [classes.cellMobile]: mobileView })}>
                    {exercise.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '16px' }} className={cx({ [classes.cellMobile]: mobileView })}>
                    {exercise.sets}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '16px' }} className={cx({ [classes.cellMobile]: mobileView })}>
                    {exercise.reps}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '16px' }} className={cx({ [classes.cellMobile]: mobileView })}>
                    {exercise.weight}
                  </TableCell>
                  {onDelete && (
                    <TableCell sx={{ textAlign: 'center', fontSize: '16px' }} className={cx({ [classes.cellMobile]: mobileView })}>
                      <CancelPresentationIcon onClick={() => onDelete(exercise.id)} />
                    </TableCell>
                  )}
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
  colorLabel: { color: theme.palette.primary.main },
  workoutLabel: {
    textTransform: 'capitalize',
    marginLeft: theme.spacing(7)
  },
  headCell: { color: theme.palette.text.secondary, textAlign: 'center' },
  cellMobile: { padding: '6px 8px' },
  cellName: { fontWeight: 500 },
  headCellMobile: { padding: '6px 8px' }
}));
