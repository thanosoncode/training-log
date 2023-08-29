import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      cardio: '	#a9d6a9',
      mixed: '#9fe0ce'
    }
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: 'none'
        }
      }
    }
  }
});

export default theme;
