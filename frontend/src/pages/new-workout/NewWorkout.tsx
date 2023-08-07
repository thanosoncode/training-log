import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NewWorkout = () => {
  return (
    <Box sx={{ display: 'flex', gap: '24px', justifyContent: 'center', width: '100%', paddingTop: '100px', alignItems: 'center' }}>
      <Link to="/new-workout/strength">
        <Button variant="contained" sx={{ fontWeight: 'bold', padding: '12px 18px' }}>
          Strength
        </Button>
      </Link>
      <Typography variant="h6">OR</Typography>
      <Link to="/new-workout/cardio">
        <Button variant="contained" sx={{ fontWeight: 'bold', padding: '12px 18px' }}>
          Cardio
        </Button>
      </Link>
    </Box>
  );
};
export default NewWorkout;
