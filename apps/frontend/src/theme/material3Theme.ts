import { createTheme, alpha } from '@mui/material/styles';
import { material3Colors } from './colors';
import { material3Elevation } from './elevation';
export const material3Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: material3Colors.primary[40],
      light: material3Colors.primary[80],
      dark: material3Colors.primary[20],
      contrastText: material3Colors.primary[99],
    },
    secondary: {
      main: material3Colors.secondary[40],
      light: material3Colors.secondary[80],
      dark: material3Colors.secondary[20],
      contrastText: material3Colors.secondary[99],
    },
    error: {
      main: material3Colors.error[40],
      light: material3Colors.error[80],
      dark: material3Colors.error[20],
      contrastText: material3Colors.error[99],
    },
    background: {
      default: material3Colors.neutral[99],
      paper: material3Colors.neutral[99],
    },
    text: {
      primary: material3Colors.neutral[10],
      secondary: material3Colors.neutral[50],
      disabled: material3Colors.neutral[60],
    },
    action: {
      active: alpha(material3Colors.primary[40], 0.12),
      hover: alpha(material3Colors.primary[40], 0.08),
      selected: alpha(material3Colors.primary[40], 0.12),
      disabled: alpha(material3Colors.neutral[60], 0.12),
      disabledBackground: alpha(material3Colors.neutral[60], 0.12),
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: material3Elevation[1],
          '&:hover': {
            boxShadow: material3Elevation[2],
          },
          '&:active': {
            boxShadow: material3Elevation[1],
          },
        },
        contained: {
          '&:hover': {
            boxShadow: material3Elevation[2],
          },
        },
        outlined: {
          borderWidth: 1,
          '&:hover': {
            borderWidth: 1,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          boxShadow: material3Elevation[1],
          '&:hover': {
            boxShadow: material3Elevation[2],
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: material3Elevation[1],
        },
        elevation2: {
          boxShadow: material3Elevation[2],
        },
        elevation3: {
          boxShadow: material3Elevation[3],
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 28,
        },
      },
    },
  },
});
