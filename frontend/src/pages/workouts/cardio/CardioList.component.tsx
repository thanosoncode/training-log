import Box from '@mui/material/Box';
import { useStyles } from './CardioList.styles';
import { useState } from 'react';
import FIlterBy from '../../../components/filterBy/FIlterBy.component';
import { SelectChangeEvent } from '@mui/material/Select';
import { LONG_CACHE, cardioLabels } from '../../../utils/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCardio, getAllCardio } from '../../../api/cardio';
import { Backdrop, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import theme from '../../../theme';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { format, parseISO } from 'date-fns';
import ConfirmationDialog from '../../../components/confirmationDialog/ConfirmationDialog.component';
import DeleteForever from '@mui/icons-material/DeleteForever';

const CardioList = () => {
  const { classes } = useStyles();
  const queryClient = useQueryClient();
  const [selectedLabel, setSelectedLabel] = useState('');
  const [cardioToDelete, setCardioToDelete] = useState('');
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

  const handleLabelChange = (event: SelectChangeEvent<string>) => setSelectedLabel(event.target.value);

  const { data: cardio, isLoading } = useQuery(['cardio'], getAllCardio, {
    refetchOnWindowFocus: false,
    staleTime: LONG_CACHE
  });

  const { mutate: deleteSelectedWorkout, isLoading: isDeleting } = useMutation(['delete-cardio'], deleteCardio, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cardio'] })
  });

  const handleDeleteAction = (confirm: boolean) => {
    if (confirm && cardioToDelete) {
      deleteSelectedWorkout(cardioToDelete);
      setIsConfirmationDialogOpen(false);
    }
    setIsConfirmationDialogOpen(false);
  };

  const cardioMap =
    cardio &&
    cardio.reduce((acc: { [key: string]: number }, current) => {
      if (acc[current.exercise.name]) {
        acc[current.exercise.name]++;
      } else {
        acc[current.exercise.name] = 1;
      }
      return acc;
    }, {});

  const handleDelete = (id: string) => {
    setCardioToDelete(id);
    setIsConfirmationDialogOpen(true);
  };

  const createDate = (createdAt: string) => {
    const date = parseISO(createdAt);
    const day = format(date, 'dd');
    const year = format(date, 'yy');
    const monthLong = format(date, 'MM');
    const formattedDate = `${day}/${monthLong.slice(0, 3)}/${year}`;
    return formattedDate;
  };

  const filteredCardio = selectedLabel ? cardio && cardio.filter((c) => c.exercise.name === selectedLabel) : cardio;

  return (
    <div>
      <Box className={classes.titleContainer}>
        <Box sx={{ marginLeft: 'auto' }}>
          <FIlterBy labels={cardioLabels} workoutsMap={cardioMap} selectedLabel={selectedLabel} handleLabelChange={handleLabelChange} />
        </Box>
      </Box>

      {cardio && (
        <TableContainer component={Paper} sx={{ height: 'min-content', border: '1px solid #464646' }}>
          <Table size="small">
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell sx={{ color: theme.palette.text.secondary }}>Type</TableCell>
                <TableCell className={classes.headCell}>Date</TableCell>
                <TableCell className={classes.headCell}>Distance &#40;meters&#41;</TableCell>
                <TableCell className={classes.headCell}>Time &#40;minutes&#41;</TableCell>
                <TableCell className={classes.headCell}>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCardio &&
                filteredCardio.map((c) => {
                  return (
                    <TableRow key={c.id} className={classes.row}>
                      <TableCell className={classes.cellName} sx={{ fontSize: '16px' }}>
                        {c.exercise.name}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '15px' }}>{c.createdAt && createDate(c.createdAt)}</TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '16px' }}>{c.exercise.distance}</TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '16px' }}>{c.exercise.minutes}</TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '16px' }}>
                        <DeleteForever fontSize="small" onClick={() => c.id && handleDelete(c.id)} className={classes.deleteIcon} />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isDeleting}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ConfirmationDialog open={isConfirmationDialogOpen} onAction={handleDeleteAction} />
    </div>
  );
};
export default CardioList;
