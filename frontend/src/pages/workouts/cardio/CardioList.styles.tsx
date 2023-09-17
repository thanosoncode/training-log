import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    margin: theme.spacing(3, 0, 4, 0),
    height: 40,
    padding: theme.spacing(0, 1)
  },
  head: {
    backgroundColor: theme.palette.background.paper
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  },
  rowTotal: { border: `1px solid ${theme.palette.primary.main}` },
  deleteIcon: { cursor: 'pointer', '&:hover': { color: 'gray' }, fontSize: '16px' },
  cellMobile: { padding: theme.spacing(2, 0) },
  headCellButton: { width: '100%', textTransform: 'none', padding: 0, whiteSpace: 'nowrap' },
  headCellButtonMobile: { '& span': { margin: 0 } },
  cellName: { fontWeight: 500, textAlign: 'center' },
  monthButton: { textTransform: 'none', color: 'inherit' },
  monthButtonActive: { color: theme.palette.primary.main },
  buttonsContainer: { marginLeft: 'auto', display: 'flex', alignItems: 'flex-end', justifyItems: 'center', gap: '16px' },
  buttonsContainerMobile: { alignItems: 'center', margin: '0 auto' }
}));
