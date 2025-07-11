import React from 'react';
import Box from '@/ui/Box/Box.tsx';
import CircularProgress from '@/ui/CircularProgress/CircularProgress.tsx';
import Typography from '@/ui/Typography/Typography.tsx';
import { ILoadingIndicator } from './Interface';

const LoadingIndicator = React.memo<ILoadingIndicator>(
  ({ message = 'Loading...', size = 40, color = 'primary' }) => {
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
  }
);

LoadingIndicator.displayName = 'LoadingIndicator';

export default LoadingIndicator;
