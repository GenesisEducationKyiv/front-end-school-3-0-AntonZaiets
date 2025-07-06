import React from 'react';
import Box from '@/ui/Box';
import CircularProgress from '@/ui/CircularProgress';
import Typography from '@/ui/Typography';
import { ILoadingIndicator } from './Interface';

const LoadingIndicator = React.memo<ILoadingIndicator>(({
  message = 'Loading...',
  size = 40,
  color = 'primary',
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
      data-testid="loading-indicator"
    >
      <CircularProgress
        size={size}
        color={color}
        data-testid="circular-progress"
      />
      {message && (
        <Typography variant="body1" mt={2} data-testid="loading-message">
          {message}
        </Typography>
      )}
    </Box>
  );
});

LoadingIndicator.displayName = 'LoadingIndicator';

export default LoadingIndicator;
