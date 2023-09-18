import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

const NewWorkout = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.root}>
      <Link to="/new-workout/strength">
        <Button variant="contained" className={classes.button}>
          Strength
        </Button>
      </Link>
      <Typography variant="h6">OR</Typography>
      <Link to="/new-workout/cardio">
        <Button variant="contained" className={classes.button}>
          Cardio
        </Button>
      </Link>
    </Box>
  );
};
export default NewWorkout;

const useStyles = makeStyles()(() => ({
  root: { display: 'flex', gap: '24px', justifyContent: 'center', width: '100%', alignItems: 'center' },
  button: { fontWeight: 'bold', padding: '12px 18px' }
}));
