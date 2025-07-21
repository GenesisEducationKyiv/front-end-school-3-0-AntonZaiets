import React from 'react';
import MuiCard, { CardProps as MuiCardProps } from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { material3Elevation } from '@/theme/elevation';

export interface CardProps extends Omit<MuiCardProps, 'variant'> {
  variant?: 'elevated' | 'filled' | 'outlined';
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
}

const StyledCard = styled(MuiCard)<{
  material3Variant?: string;
  material3Elevation?: number;
}>(({
  theme,
  material3Variant = 'elevated',
  material3Elevation: elevation = 1,
}) => {
  const getVariantStyles = () => {
    switch (material3Variant) {
      case 'filled':
        return {
          backgroundColor: theme.palette.action.hover,
          boxShadow: 'none',
          border: 'none',
        };
      case 'outlined':
        return {
          backgroundColor: theme.palette.background.paper,
          boxShadow: 'none',
          border: `1px solid ${theme.palette.divider}`,
        };
      case 'elevated':
      default:
        return {
          backgroundColor: theme.palette.background.paper,
          boxShadow:
            material3Elevation[elevation as keyof typeof material3Elevation],
          '&:hover': {
            boxShadow:
              material3Elevation[
                Math.min(elevation + 1, 5) as keyof typeof material3Elevation
              ],
          },
        };
    }
  };

  return {
    borderRadius: 28,
    overflow: 'hidden',
    transition: theme.transitions.create(['box-shadow', 'transform'], {
      duration: theme.transitions.duration.standard,
    }),
    ...getVariantStyles(),
  };
});

const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  elevation = 1,
  ...props
}) => {
  const getMuiVariant = (material3Variant: string) => {
    switch (material3Variant) {
      case 'elevated':
        return 'elevation';
      case 'outlined':
        return 'outlined';
      default:
        return 'elevation';
    }
  };

  return (
    <StyledCard
      variant={getMuiVariant(variant)}
      material3Variant={variant}
      material3Elevation={elevation}
      {...props}
    />
  );
};

export default Card;
