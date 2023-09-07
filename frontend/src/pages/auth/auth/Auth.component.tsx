import { Alert, Box, Button, Container, FormControl, Paper, Snackbar, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { loginUser, registerUser } from '../../../api/user';
import { NotificationMessage, UserFromServer } from '../../../utils/models';
import { useStyles } from './Auth.styles';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { AxiosError } from 'axios';
import { useAppDispatch, useAppState } from '../../../context/AppContext';

type ResponseData = {
  message: string;
};

const Auth = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const [isMember, setIsMember] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState<NotificationMessage>({
    name: '',
    open: false,
    severity: 'error'
  });

  const handleIsMember = () => setIsMember(!isMember);

  const { mutate: register, isLoading: isRegistering } = useMutation(['register'], registerUser, {
    onSuccess: (data) => {
      setFormData({ email: '', password: '' });
      setMessage({
        name: 'User registered!',
        open: true,
        severity: 'success'
      });
      appDispatch({ type: 'SET_USER', payload: data });
      //   navigate('/');
    },
    onError: (data: AxiosError<ResponseData>) => {
      setMessage({
        name: data.response?.data.message ?? '',
        open: true,
        severity: 'error'
      });
    }
  });

  const { mutate: login, isLoading: isLogining } = useMutation(['login'], loginUser, {
    onSuccess: (data) => {
      setFormData({ email: '', password: '' });
      setMessage({
        name: 'User logged in!',
        open: true,
        severity: 'success'
      });

      appDispatch({ type: 'SET_USER', payload: data });
      //   navigate('/');
    },
    onError: (data: AxiosError<ResponseData>) => {
      setMessage({
        name: data.response?.data.message ?? '',
        open: true,
        severity: 'error'
      });
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isMember) {
      register({ email: formData.email, password: formData.password });
      return;
    }
    login({ email: formData.email, password: formData.password });
  };

  const handleTextfieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(() => ({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleMessageClose = () => {
    setMessage(() => ({ ...message, open: false }));
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.root} sx={{ boxShadow: 5 }}>
        <Typography className={classes.title} variant="h5">
          {isMember ? 'Login' : 'Register'}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl>
            <TextField id="email" label="Email" variant="standard" name="email" value={formData.email} onChange={handleTextfieldChange} />
          </FormControl>
          <FormControl>
            <TextField id="password" label="Password" variant="standard" name="password" value={formData.password} onChange={handleTextfieldChange} />
          </FormControl>
          <LoadingButton variant="contained" className={classes.submitButton} type="submit" disabled={isRegistering} loading={isRegistering || isLogining}>
            {isMember ? 'Log in' : 'Register'}
          </LoadingButton>
        </form>
        <Box className={classes.footer}>
          <Typography>{isMember ? 'Not a member yet?' : 'Already a member?'}</Typography>
          <Button onClick={handleIsMember} variant="text" className={classes.footerButton}>
            {isMember ? 'Register' : 'Login'}
          </Button>
        </Box>
      </Paper>
      <Snackbar open={message?.open} autoHideDuration={6000} onClose={handleMessageClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleMessageClose} severity={message?.severity} sx={{ width: '100%' }}>
          {message?.name}
        </Alert>
      </Snackbar>
    </Container>
  );
};
export default Auth;
