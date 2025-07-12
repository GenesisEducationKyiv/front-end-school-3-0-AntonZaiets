import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import { material3Elevation } from '@/theme/material3Theme.ts';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'contained' | 'outlined' | 'text' | 'elevated' | 'tonal' | 'filled';
}

const StyledButton = styled(MuiButton)<{ material3Variant?: string }>(({
  theme,
  material3Variant = 'contained',
}) => {
  const getVariantStyles = () => {
    switch (material3Variant) {
      case 'elevated':
        return {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.primary.main,
          boxShadow: material3Elevation[1],
          '&:hover': {
            backgroundColor: theme.palette.background.paper,
            boxShadow: material3Elevation[2],
          },
          '&:active': {
            boxShadow: material3Elevation[1],
          },
        };
      case 'tonal':
        return {
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
          color: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.16),
          },
        };
      case 'filled':
        return {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        };
      default:
        return {};
    }
  };

  return {
    borderRadius: 20,
    textTransform: 'none',
    fontWeight: 500,
    minHeight: 40,
    padding: '10px 24px',
    fontSize: '0.875rem',
    lineHeight: 1.14,
    letterSpacing: '0.1px',
    transition: theme.transitions.create(['all'], {
      duration: theme.transitions.duration.standard,
    }),
    ...getVariantStyles(),
    '&.MuiButton-sizeSmall': {
      minHeight: 32,
      padding: '6px 16px',
      fontSize: '0.75rem',
    },
    '&.MuiButton-sizeLarge': {
      minHeight: 48,
      padding: '14px 32px',
      fontSize: '1rem',
    },
  };
});

const Button: React.FC<ButtonProps> = ({ variant = 'contained', ...props }) => {
  const getMuiVariant = (material3Variant: string) => {
    switch (material3Variant) {
      case 'elevated':
      case 'tonal':
      case 'filled':
        return 'contained';
      default:
        return material3Variant as 'contained' | 'outlined' | 'text';
    }
  };

  return (
    <StyledButton
      variant={getMuiVariant(variant)}
      material3Variant={variant}
      {...props}
    />
  );
};

export default Button;
