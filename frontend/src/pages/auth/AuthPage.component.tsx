import { Button, Theme } from '@mui/material';
import Auth from './auth/Auth.component';
import { makeStyles } from 'tss-react/mui';

const AuthPage = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Auth />
      <p>or</p>
      <Button className={classes.button}>Join as a guest</Button>
    </div>
  );
};
export default AuthPage;

const useStyles = makeStyles()((theme: Theme) => ({
  root: { display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', marginTop: '120px' },
  button: { fontSize: 18, border: `1px solid ${theme.palette.primary.main}`, padding: theme.spacing(1, 4) }
}));
