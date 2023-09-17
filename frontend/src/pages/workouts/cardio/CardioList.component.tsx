import Box from '@mui/material/Box';
import { useStyles } from './CardioList.styles';
import { useState } from 'react';
import FIlterBy from '../../../components/filterBy/FIlterBy.component';
import { SelectChangeEvent } from '@mui/material/Select';
import { LONG_CACHE, cardioLabels } from '../../../utils/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCardio, getAllCardio } from '../../../api/cardio';
import {
  Backdrop,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery
} from '@mui/material';
import { format, parseISO } from 'date-fns';
import ConfirmationDialog from '../../../components/confirmationDialog/ConfirmationDialog.component';
import DeleteForever from '@mui/icons-material/DeleteForever';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { useAppState } from '../../../context/AppContext';
import SelectByMonth from '../../../components/selectByMonth/SelectByMonth.component';

type OrderBy = 'name' | 'time' | 'distance' | 'date';

const CardioList = () => {
  const { classes, cx } = useStyles();
  const queryClient = useQueryClient();
  const { month, year, user } = useAppState();
  const [selectedLabel, setSelectedLabel] = useState('');
  const [cardioToDelete, setCardioToDelete] = useState('');
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('desc');
  const [orderBy, setOrderBy] = useState<OrderBy>('date');
  const [selectedMonth, setSelectedMonth] = useState('');
  const mobileView = useMediaQuery('(max-width:800px)');

  const handleLabelChange = (event: SelectChangeEvent<string>) => setSelectedLabel(event.target.value);

  const { data: cardio, isLoading } = useQuery(['cardio'], () => getAllCardio({ month: 0, year: 0, userId: user?.id ?? '' }), {
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

  const filterdByMonth = selectedMonth ? cardio && cardio.filter((c) => new Date(c.createdAt).getMonth() + 1 === Number(selectedMonth)) : cardio;

  const cardioMap =
    filterdByMonth &&
    filterdByMonth.reduce((acc: { [key: string]: number }, current) => {
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

  const filteredByLabel = selectedLabel ? cardio && cardio.filter((c) => c.exercise.name === selectedLabel) : cardio;

  const handleTypeClick = (orderBy: OrderBy) => {
    setOrderDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setOrderBy(orderBy);
  };

  const sortedCardio = () => {
    if (filteredByLabel) {
      const sorted = [...filteredByLabel];
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

  const cardioToShow = selectedMonth ? sortedCardio().filter((w) => new Date(w.createdAt).getMonth() + 1 === Number(selectedMonth)) : sortedCardio();

  const totalDistance = cardioToShow.reduce((acc, curr) => {
    return (acc += Number(curr.exercise.distance));
  }, 0);

  const totalTime = cardioToShow.reduce((acc, curr) => {
    return (acc += Number(curr.exercise.minutes));
  }, 0);

  const averageKmH = totalDistance / 1000 / (totalTime / 60);

  return (
    <div>
      <Box className={classes.titleContainer}>
        <Box className={cx({ [classes.buttonsContainer]: true, [classes.buttonsContainerMobile]: mobileView })}>
          <SelectByMonth setSelectedMonth={setSelectedMonth} workouts={cardio} selectedMonth={selectedMonth} />
          <FIlterBy labels={cardioLabels} workoutsMap={cardioMap} selectedLabel={selectedLabel} handleLabelChange={handleLabelChange} />
        </Box>
      </Box>
      {cardioToShow && cardioToShow.length > 0 ? (
        <TableContainer component={Paper} sx={{ height: 'min-content', border: '1px solid #464646' }}>
          <Table size="small">
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell className={cx({ [classes.cellMobile]: mobileView })} onClick={() => handleTypeClick('name')}>
                  <Button
                    variant="text"
                    endIcon={<ImportExportIcon />}
                    className={cx({ [classes.headCellButton]: true, [classes.headCellButtonMobile]: mobileView })}>
                    Type
                  </Button>
                </TableCell>
                <TableCell className={cx({ [classes.cellMobile]: mobileView })} onClick={() => handleTypeClick('date')}>
                  <Button
                    variant="text"
                    endIcon={<ImportExportIcon />}
                    className={cx({ [classes.headCellButton]: true, [classes.headCellButtonMobile]: mobileView })}>
                    Date
                  </Button>
                </TableCell>
                <TableCell className={cx({ [classes.cellMobile]: mobileView })} onClick={() => handleTypeClick('distance')}>
                  <Button
                    variant="text"
                    endIcon={<ImportExportIcon />}
                    className={cx({ [classes.headCellButton]: true, [classes.headCellButtonMobile]: mobileView })}>
                    {mobileView ? 'Dist.' : 'Distance'} &#40;m&#41;
                  </Button>
                </TableCell>
                <TableCell className={cx({ [classes.cellMobile]: mobileView })} onClick={() => handleTypeClick('time')}>
                  <Button
                    variant="text"
                    endIcon={<ImportExportIcon />}
                    className={cx({ [classes.headCellButton]: true, [classes.headCellButtonMobile]: mobileView })}>
                    Time &#40;m&#41;
                  </Button>
                </TableCell>
                <TableCell className={cx({ [classes.cellMobile]: mobileView })}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cardioToShow.map((c) => {
                return (
                  <TableRow key={c.id} className={classes.row}>
                    <TableCell sx={{ fontSize: '16px' }} className={cx({ [classes.cellName]: true, [classes.cellMobile]: mobileView })}>
                      {c.exercise.name}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', fontSize: '15px' }} className={cx({ [classes.cellMobile]: mobileView })}>
                      {c.createdAt && createDate(c.createdAt)}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', fontSize: '16px' }} className={cx({ [classes.cellMobile]: mobileView })}>
                      {c.exercise.distance}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', fontSize: '16px' }} className={cx({ [classes.cellMobile]: mobileView })}>
                      {c.exercise.minutes}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', fontSize: '16px' }} className={cx({ [classes.cellMobile]: mobileView })}>
                      <DeleteForever fontSize="small" onClick={() => c.id && handleDelete(c.id)} className={classes.deleteIcon} />
                    </TableCell>
                  </TableRow>
                );
              })}
              {selectedLabel && cardioToShow.length > 0 ? (
                <TableRow className={classes.rowTotal}>
                  <TableCell sx={{ textAlign: 'center', fontSize: '15px' }}>{selectedLabel}</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '15px' }}>Avg. {isNaN(averageKmH) ? 0 : averageKmH.toFixed(2)}km/h</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '15px' }}>{totalDistance}</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '15px' }}>{totalTime}</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '15px' }}> </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography sx={{ marginTop: '16px', textAlign: 'center' }}>Not many things to show.</Typography>
      )}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isDeleting}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ConfirmationDialog open={isConfirmationDialogOpen} onAction={handleDeleteAction} />
    </div>
  );
};
export default CardioList;
