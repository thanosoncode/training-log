import Box from '@mui/material/Box';
import { useStyles } from './CardioList.styles';
import { useMemo, useState } from 'react';
import FIlterBy from '../../../components/filterBy/FIlterBy.component';
import { SelectChangeEvent } from '@mui/material/Select';
import { LONG_CACHE, cardioLabels } from '../../../utils/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCardio, getAllCardio } from '../../../api/cardio';
import { Backdrop, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import theme from '../../../theme';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { format, parseISO } from 'date-fns';
import ConfirmationDialog from '../../../components/confirmationDialog/ConfirmationDialog.component';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { Cardio } from '../../../utils/models';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { useAppState } from '../../../context/AppContext';

type OrderBy = 'name' | 'time' | 'distance' | 'date';

const CardioList = () => {
  const { classes } = useStyles();
  const queryClient = useQueryClient();
  const { month, year } = useAppState();
  const [selectedLabel, setSelectedLabel] = useState('');
  const [cardioToDelete, setCardioToDelete] = useState('');
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

  const handleLabelChange = (event: SelectChangeEvent<string>) => setSelectedLabel(event.target.value);

  const { data: cardio, isLoading } = useQuery(['cardio'], () => getAllCardio({ month, year }), {
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

  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('name');

  const handleTypeClick = (orderBy: OrderBy) => {
    setOrderDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setOrderBy(orderBy);
  };

  const sortedCardio = () => {
    if (filteredCardio) {
      const sorted = [...filteredCardio];
      sorted.sort((a, b) => {
        switch (orderBy) {
          case 'name':
            return orderDirection === 'asc' ? a.exercise.name.localeCompare(b.exercise.name) : b.exercise.name.localeCompare(a.exercise.name);
          case 'time':
            return orderDirection === 'asc' ? Number(a.exercise.minutes) - Number(b.exercise.minutes) : Number(b.exercise.minutes) - Number(a.exercise.minutes);
          case 'distance':
            return orderDirection === 'asc'
              ? Number(a.exercise.distance) - Number(b.exercise.distance)
              : Number(b.exercise.distance) - Number(a.exercise.distance);
          case 'date':
            return orderDirection === 'asc'
              ? parseISO(a.createdAt ?? '').getTime() - parseISO(b.createdAt ?? '').getTime()
              : parseISO(b.createdAt ?? '').getTime() - parseISO(a.createdAt ?? '').getTime();
        }
      });
      return sorted;
    }
    return [];
  };

  return (
    <div>
      <Box className={classes.titleContainer}>
        <Box sx={{ marginLeft: 'auto' }}>
          <FIlterBy labels={cardioLabels} workoutsMap={cardioMap} selectedLabel={selectedLabel} handleLabelChange={handleLabelChange} />
        </Box>
      </Box>

      {filteredCardio && (
        <TableContainer component={Paper} sx={{ height: 'min-content', border: '1px solid #464646' }}>
          <Table size="small">
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell className={classes.headCell} onClick={() => handleTypeClick('name')}>
                  <Button variant="text" endIcon={<ImportExportIcon />} className={classes.headCellButton}>
                    Type
                  </Button>
                </TableCell>
                <TableCell className={classes.headCell} onClick={() => handleTypeClick('date')}>
                  <Button variant="text" endIcon={<ImportExportIcon />} className={classes.headCellButton}>
                    Date
                  </Button>
                </TableCell>
                <TableCell className={classes.headCell} onClick={() => handleTypeClick('distance')}>
                  <Button variant="text" endIcon={<ImportExportIcon />} className={classes.headCellButton}>
                    Distance &#40;m&#41;
                  </Button>
                </TableCell>
                <TableCell className={classes.headCell} onClick={() => handleTypeClick('time')}>
                  <Button variant="text" endIcon={<ImportExportIcon />} className={classes.headCellButton}>
                    Time &#40;m&#41;
                  </Button>
                </TableCell>
                <TableCell className={classes.headCell}>
                  <Button variant="text" className={classes.headCellButton}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCardio().map((c) => {
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
