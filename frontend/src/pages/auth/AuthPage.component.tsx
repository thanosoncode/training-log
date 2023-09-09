import { Backdrop, Button, CircularProgress, Theme } from '@mui/material';
import Auth from './auth/Auth.component';
import { makeStyles } from 'tss-react/mui';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../api/user';
import { NotificationMessage } from '../../utils/models';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../../context/AppContext';

type ResponseData = {
  message: string;
};

const AuthPage = () => {
  const { classes } = useStyles();
  const appDispatch = useAppDispatch();
  const [message, setMessage] = useState<NotificationMessage>({
    name: '',
    open: false,
    severity: 'error'
  });

  const { mutate: login, isLoading } = useMutation(['login'], loginUser, {
    onSuccess: (data) => {
      setMessage({
        name: 'User logged in!',
        open: true,
        severity: 'success'
      });

      appDispatch({ type: 'SET_USER', payload: data });
    },
    onError: (data: AxiosError<ResponseData>) => {
      setMessage({
        name: data.response?.data.message ?? '',
        open: true,
        severity: 'error'
      });
    }
  });

  const handleGuestLogin = () => {
    login({ email: process.env.DUMMY_USER ?? '', password: process.env.DUMMY_PASSWORD ?? '' });
  };

  return (
    <div className={classes.root}>
      <Auth />
      <p>or</p>
      <Button className={classes.button} onClick={handleGuestLogin} disabled={isLoading}>
        Join as a guest
      </Button>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" title="Saving workout..." />
      </Backdrop>
    </div>
  );
};
export default AuthPage;

const useStyles = makeStyles()((theme: Theme) => ({
  root: { display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', marginTop: '128px' },
  button: { fontSize: 18, border: `1px solid ${theme.palette.primary.main}`, padding: theme.spacing(1, 4) }
}));
