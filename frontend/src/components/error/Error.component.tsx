import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Link, useRouteError } from 'react-router-dom';

import theme from '../../theme';

const Error = () => {
  const error = useRouteError() as { status: string; statusText: string };
  return (
    <Box
      sx={{
        padding: theme.spacing(0, 12),
        marginTop: theme.spacing(12),
        textAlign: 'center'
      }}>
      <Typography variant="h6">Something went terribly wrong. Try again later.</Typography>
      <Typography variant="subtitle1">
        {error.status} {error.statusText}
      </Typography>
      <Link to="/">
        <Button sx={{ color: theme.palette.text.primary, marginTop: '16px' }}> go back home</Button>
      </Link>
    </Box>
  );
};
export default Error;
