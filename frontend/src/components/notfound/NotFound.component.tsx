import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <p>Oops! It seems like you've taken a wrong turn.</p>
      <h3>404 Page not found.</h3>
      <Link to="/">
        <Button>go back home</Button>
      </Link>
    </div>
  );
};
export default NotFound;
