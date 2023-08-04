import Dialog from '@mui/material/Dialog';

interface DeleteConfirmationDialogProps {
  open: boolean;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ open }) => {
  return <Dialog open={open}>this is a dialog</Dialog>;
};
export default DeleteConfirmationDialog;
