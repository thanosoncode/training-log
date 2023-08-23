import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      bg: '#121212',
      menu: '#181818',
      topGradient: '#404040',
      bottomGradient: '#282828',
      primaryText: '#ffffff',
      secondaryText: '#b3b3b3',
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
