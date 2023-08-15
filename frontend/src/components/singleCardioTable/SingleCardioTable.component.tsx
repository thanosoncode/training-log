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
import { CardioWorkoutFromServer } from '../../utils/models';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

interface SingleCardioTableProps {
  cardio: CardioWorkoutFromServer;
  onDelete?: (id: string) => void;
}

const SingleCardioTable: React.FC<SingleCardioTableProps> = ({ cardio, onDelete }) => {
  const { classes } = useStyles();

  return (
    <>
      <Box className={classes.workoutTitle}>
        <Typography variant="subtitle2" sx={{ paddingLeft: theme.spacing(1) }}>
          {cardio?.createdAt ? format(new Date(cardio?.createdAt).getTime(), 'dd/MM/yyyy') : ''}{' '}
        </Typography>
        <Typography variant="h6" className={classes.workoutLabel}>
          {cardio?.exercise.name}
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ height: 'min-content', border: '1px solid #464646' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: theme.palette.text.secondary }}>Exercise</TableCell>
              <TableCell className={classes.headCell}> Distance &#40;m&#41;</TableCell>
              <TableCell className={classes.headCell}> Minutes &#40;m&#41;</TableCell>
              {onDelete && <TableCell className={classes.headCell}>Remove</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={cardio.id}>
              <TableCell className={classes.cellName} sx={{ fontSize: '16px' }}>
                {cardio.exercise.name}
              </TableCell>
              <TableCell sx={{ textAlign: 'center', fontSize: '16px' }}>{cardio.exercise.distance}</TableCell>
              <TableCell sx={{ textAlign: 'center', fontSize: '16px' }}>{cardio.exercise.minutes}</TableCell>
              {onDelete && (
                <TableCell sx={{ textAlign: 'center', fontSize: '16px' }}>
                  <CancelPresentationIcon onClick={() => onDelete(cardio.id)} />
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default SingleCardioTable;

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
