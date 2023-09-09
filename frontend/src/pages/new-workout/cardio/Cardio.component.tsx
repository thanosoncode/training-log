import Box from '@mui/material/Box';
import { useStyles } from './Cardio.styles';
import AddLabel from '../../../components/addLabel/AddLabel.component';
import { cardioLabels } from '../../../utils/constants';
import { useState } from 'react';
import { Backdrop, Button, CircularProgress, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCardio } from '../../../api/cardio';
import { useAppState } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Cardio = () => {
  const { classes } = useStyles();
  const queryClient = useQueryClient();
  const { user } = useAppState();
  const navigate = useNavigate();
  const [cardioLabel, setCardioLabel] = useState('');
  const [exercise, setExercise] = useState({ distance: '', minutes: '' });
  const readyToSave = cardioLabel && exercise.distance && exercise.minutes;

  const handleCardioTypeChange = (event: SelectChangeEvent<string>) => {
    setCardioLabel(event.target.value);
  };

  const { mutate, isLoading: isSavingCardio } = useMutation(
    ['create-cardio'],
    () => postCardio({ name: cardioLabel, distance: exercise.distance, minutes: exercise.minutes, userId: user?.id ?? '' }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cardio'] });
        setExercise({ distance: '', minutes: '' });
        setCardioLabel('');
        navigate('/workouts/cardio');
      }
    }
  );

  return (
    <Box className={classes.root}>
      {cardioLabel ? (
        <Box sx={{}}>
          <Typography variant="h3" sx={{ textTransform: 'capitalize', lineHeight: 'intial', marginBottom: '64px' }}>
            {cardioLabel}
          </Typography>
          <Box sx={{ display: 'flex', gap: '24px' }}>
            <TextField
              label="Distance (meters)"
              variant="standard"
              type="number"
              name="distance"
              onChange={(e) => setExercise({ ...exercise, [e.target.name]: e.target.value })}
              InputProps={{ inputProps: { min: 0 } }}
            />
            <TextField
              label="Time (mins)"
              variant="standard"
              name="minutes"
              type="number"
              onChange={(e) => setExercise({ ...exercise, [e.target.name]: e.target.value })}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Box>
        </Box>
      ) : (
        <AddLabel title="What type of cardio?" label={cardioLabel} labels={cardioLabels} onChange={handleCardioTypeChange} />
      )}

      {readyToSave && (
        <Button variant="outlined" sx={{ height: 'min-content', marginTop: '64px' }} onClick={() => mutate()}>
          {isSavingCardio ? 'Saving cardio...' : 'Save cardio'}
        </Button>
      )}

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isSavingCardio}>
        <CircularProgress color="inherit" title="Saving workout..." />
      </Backdrop>
    </Box>
  );
};
export default Cardio;
