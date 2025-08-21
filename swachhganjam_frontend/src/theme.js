import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#16a249', // your green
    },
    secondary: {
      main: '#3f51b5', // your blue
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& input': {
            color: 'black',
            caretColor: 'black',
          },
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0px 1000px white inset !important',
            WebkitTextFillColor: 'black !important',
            caretColor: 'black',
          },
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover fieldset': {
            borderColor: 'black',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#16a249', // keep your primary green
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
  },
});

export default theme;
