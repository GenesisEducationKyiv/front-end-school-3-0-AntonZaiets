import React from 'react';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { styled, alpha } from '@mui/material/styles';

const StyledTextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 4,
    transition: theme.transitions.create(['border-color', 'box-shadow'], {
      duration: theme.transitions.duration.standard,
    }),
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
  },
  '& .MuiFilledInput-root': {
    borderRadius: 4,
    transition: theme.transitions.create(['background-color', 'border-color'], {
      duration: theme.transitions.duration.standard,
    }),
    '&:hover': {
      backgroundColor: alpha(theme.palette.action.hover, 0.04),
    },
    '&.Mui-focused': {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
    },
  },
  '& .MuiInputLabel-root': {
    transition: theme.transitions.create(['color', 'transform'], {
      duration: theme.transitions.duration.standard,
    }),
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
}));

const TextField: React.FC<MuiTextFieldProps> = (props) => {
  return <StyledTextField {...props} />;
};

export default TextField; 