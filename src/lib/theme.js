import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#50f0ff',
    },
    secondary: {
      main: '#ca00b4',
    }
  },

  typography: {
    fontFamily: 'var(--interface-font)',
    button: {
      textTransform: 'none',
    }
  },

  components: {
    MuiBackdrop: {
      defaultProps: {
        onContextMenu: (e) => e.preventDefault(),
      },
    },
    MuiPaper: {
      defaultProps: {
        onContextMenu: (e) => e.preventDefault(),
      },
    },
  },
})
