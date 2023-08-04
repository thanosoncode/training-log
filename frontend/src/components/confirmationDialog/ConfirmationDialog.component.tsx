import { Box, Button, Dialog, Typography } from '@mui/material';
import { useStyles } from './ConfirnamtionDialog.styles';

interface ConfirmationDialogProps {
  open: boolean;
  onAction: (confirm: boolean) => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, onAction }) => {
  const { classes } = useStyles();
  return (
    <Dialog open={open}>
      <Box className={classes.container}>
        <Typography>Are you sure you want to delete this workout?</Typography>
        <Box className={classes.buttonsContainer}>
          <Button variant="outlined" onClick={() => onAction(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => onAction(true)}>
            Delete
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
export default ConfirmationDialog;
