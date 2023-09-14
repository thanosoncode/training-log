import DeleteForever from '@mui/icons-material/DeleteForever';
import { Box, Button, IconButton, SelectChangeEvent, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { countAllStrength, deleteWorkoutStrength, getAllStrength } from '../../../api/workouts';
import ConfirmationDialog from '../../../components/confirmationDialog/ConfirmationDialog.component';
import ExercisesList from '../../../components/exerciseList/ExercisesList.component';
import FIlterBy from '../../../components/filterBy/FIlterBy.component';
import { LONG_CACHE, strengthLabels } from '../../../utils/constants';
import { Workout } from '../../../utils/models';
import { useStyles } from './StrengthList.styles';
import { useAppDispatch, useAppState } from '../../../context/AppContext';

const StrengthList = () => {
  const { classes, cx } = useStyles();
  const queryClient = useQueryClient();
  const appDispatch = useAppDispatch();
  const { allStrength: workouts } = useAppState();
  const { user } = useAppState();
  const [selectedLabel, setSelectedLabel] = useState('');
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState('');
  const [showCurrentMonth, setShowCurrentMonth] = useState(false);
  const lastListItemRef = useRef<HTMLDivElement>(null);
  const [pagination, setPagination] = useState<{ skip: number; take: number }>({ skip: 0, take: 10 });

  const handleLabelChange = (event: SelectChangeEvent<string>) => setSelectedLabel(event.target.value);

  const {
    isLoading,
    isRefetching,
    refetch: refetchStrength
  } = useQuery(['strength'], () => getAllStrength({ month: 0, year: 0, userId: user?.id ?? '', skip: pagination.skip, take: pagination.take }), {
    refetchOnWindowFocus: false,
    staleTime: LONG_CACHE,
    onSuccess: (data) => {
      appDispatch({ type: 'SET_ALL_STRENGTH', payload: data });
    }
  });

  const { data: strengthCount } = useQuery(['strength-count'], countAllStrength, {
    refetchOnWindowFocus: false,
    staleTime: LONG_CACHE
  });

  const { mutate: deleteSelectedWorkout, isLoading: isDeleting } = useMutation(['delete-strength'], deleteWorkoutStrength, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['strength'] })
  });

  const handleDelete = (id: string | undefined) => {
    if (id) {
      setWorkoutToDelete(id);
      setIsConfirmationDialogOpen(true);
    }
  };

  const handleDeleteAction = (confirm: boolean) => {
    if (confirm && workoutToDelete) {
      deleteSelectedWorkout(workoutToDelete);
      setIsConfirmationDialogOpen(false);
    }
    setIsConfirmationDialogOpen(false);
  };

  const filteredWorkouts = selectedLabel ? workouts && workouts.filter((w) => w.label === selectedLabel) : workouts;

  const strengthMap =
    workouts &&
    workouts.reduce((acc: { [key: string]: number }, workout) => {
      if (acc[workout.label]) {
        acc[workout.label]++;
      } else {
        acc[workout.label] = 1;
      }
      return acc;
    }, {});

  const strengthToShow = showCurrentMonth
    ? filteredWorkouts && filteredWorkouts.filter((w) => new Date(w.createdAt).getMonth() + 1 !== new Date().getMonth())
    : filteredWorkouts;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && workouts.length < strengthCount) {
        setPagination({ skip: pagination.skip + 10, take: 10 });
        refetchStrength();
      }
    });
    if (lastListItemRef.current) {
      observer.observe(lastListItemRef.current);
    }
    return () => {
      if (lastListItemRef.current) {
        observer.unobserve(lastListItemRef.current);
      }
    };
  }, [workouts, strengthCount, lastListItemRef.current]);

  return (
    <Box className={classes.root}>
      <>
        <Box className={classes.titleContainer}>
          <Box className={classes.buttonsContainer}>
            <Button
              onClick={() => setShowCurrentMonth(!showCurrentMonth)}
              className={cx({ [classes.monthButton]: true, [classes.monthButtonActive]: showCurrentMonth })}>
              Show only this month
            </Button>
            <FIlterBy selectedLabel={selectedLabel} labels={strengthLabels} workoutsMap={strengthMap} handleLabelChange={handleLabelChange} />
          </Box>
        </Box>
        <Box className={classes.workoutsContainer}>
          {isLoading && <CircularProgress />}
          {strengthToShow && strengthToShow.length > 0 ? (
            strengthToShow.map((workout: Workout, index) => {
              const { id, label, exercises } = workout;
              return (
                <Box key={id} className={classes.workout} ref={index === workouts.length - 1 ? lastListItemRef : null}>
                  <Box className={classes.workoutTitle}>
                    <Box>
                      <Typography variant="h6" className={classes.workoutLabel}>
                        {label}
                      </Typography>
                      <Typography variant="subtitle2" className={classes.workoutDate}>
                        {workout?.createdAt ? format(new Date(workout?.createdAt).getTime(), 'dd/MM/yyyy') : ''}{' '}
                      </Typography>
                    </Box>
                    <IconButton onClick={() => handleDelete(id)} sx={{ padding: 0 }}>
                      <DeleteForever sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                  <Box className={classes.exercisesListContainer}>
                    <ExercisesList exercises={exercises} showTitle={false} colorLabel={true} />
                  </Box>
                </Box>
              );
            })
          ) : (
            <Typography sx={{ marginTop: '16px' }}>Not many things to show.</Typography>
          )}
          {isRefetching && (
            <Box sx={{ margin: '48px 0px', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isDeleting}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ConfirmationDialog open={isConfirmationDialogOpen} onAction={handleDeleteAction} />
    </Box>
  );
};
export default StrengthList;
