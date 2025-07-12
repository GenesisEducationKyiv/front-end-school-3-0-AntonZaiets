import { createTheme, alpha } from '@mui/material/styles';

const material3Colors = {
  primary: {
    0: '#000000',
    10: '#21005D',
    20: '#381E72',
    30: '#4F378B',
    40: '#6750A4',
    50: '#7F67BE',
    60: '#9A82DB',
    70: '#B69DF8',
    80: '#D0BCFF',
    90: '#EADDFF',
    95: '#F6EDFF',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },

  secondary: {
    0: '#000000',
    10: '#1D192B',
    20: '#332D41',
    30: '#4A4458',
    40: '#625B71',
    50: '#7A7289',
    60: '#958DA5',
    70: '#B0A7C0',
    80: '#CCC2DC',
    90: '#E8DEF8',
    95: '#F6EDFF',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },

  tertiary: {
    0: '#000000',
    10: '#31111D',
    20: '#492532',
    30: '#633B48',
    40: '#7D5260',
    50: '#986977',
    60: '#B58392',
    70: '#D29DA8',
    80: '#EFB8C8',
    90: '#FFD8E4',
    95: '#FFECF1',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },

  error: {
    0: '#000000',
    10: '#410E0B',
    20: '#601410',
    30: '#8C1D18',
    40: '#B3261E',
    50: '#DC362E',
    60: '#E46962',
    70: '#EC928E',
    80: '#F2B8B5',
    90: '#F9DEDC',
    95: '#FCEEEE',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },

  neutral: {
    0: '#000000',
    10: '#1C1B1F',
    20: '#313033',
    30: '#484649',
    40: '#605D62',
    50: '#787579',
    60: '#939094',
    70: '#AEAAAE',
    80: '#C9C5CA',
    90: '#E6E1E5',
    95: '#F4EFF4',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },

  neutralVariant: {
    0: '#000000',
    10: '#1D1A22',
    20: '#322F37',
    30: '#49454F',
    40: '#605D66',
    50: '#79747E',
    60: '#938F99',
    70: '#AEA9B4',
    80: '#CAC4D0',
    90: '#E7E0EC',
    95: '#F4EEF4',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },
};

const material3Typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '3.5rem',
    fontWeight: 400,
    lineHeight: 1.12,
    letterSpacing: '-0.25px',
  },
  h2: {
    fontSize: '2.8125rem',
    fontWeight: 400,
    lineHeight: 1.16,
    letterSpacing: '0px',
  },
  h3: {
    fontSize: '2.125rem',
    fontWeight: 400,
    lineHeight: 1.17,
    letterSpacing: '0px',
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1.33,
    letterSpacing: '0.15px',
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 400,
    lineHeight: 1.4,
    letterSpacing: '0.15px',
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.33,
    letterSpacing: '0.15px',
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.15px',
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.43,
    letterSpacing: '0.1px',
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.5px',
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: '0.25px',
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.14,
    letterSpacing: '0.1px',
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.33,
    letterSpacing: '0.4px',
  },
  overline: {
    fontSize: '0.625rem',
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
};

const material3Spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
};

const material3Shape = {
  borderRadius: {
    none: 0,
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    full: '9999px',
  },
};

const material3Elevation = {
  0: 'none',
  1: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
  2: '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
  3: '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.30)',
  4: '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 4px 0px rgba(0, 0, 0, 0.30)',
  5: '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 6px 0px rgba(0, 0, 0, 0.30)',
};

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

export {
  material3Colors,
  material3Typography,
  material3Spacing,
  material3Shape,
  material3Elevation,
};
