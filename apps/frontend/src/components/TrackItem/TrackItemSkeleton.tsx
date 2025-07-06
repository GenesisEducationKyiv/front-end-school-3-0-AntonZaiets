import { Box, Skeleton } from '@mui/material';

const TrackItemSkeleton = () => (
  <Box display="flex" alignItems="center" mb={2}>
    <Skeleton variant="rectangular" width={56} height={56} sx={{ mr: 2 }} />
    <Box flex={1}>
      <Skeleton variant="text" width="60%" height={24} />
      <Skeleton variant="text" width="40%" height={18} />
    </Box>
    <Skeleton variant="circular" width={32} height={32} sx={{ ml: 2 }} />
  </Box>
);

export default TrackItemSkeleton; 