import Box from '@/ui/Box/Box.tsx';
import Typography from '@/ui/Typography/Typography.tsx';
import Chip from '@/ui/Chip/Chip.tsx';
import { BaseTrack } from '@/types/types.ts';
import React, { Suspense } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator.tsx';
const CoverImage = React.lazy(() => import('@/ui/Avatar/Avatar.tsx'));

const TrackInfo = ({
  track,
  loading,
}: {
  track: BaseTrack;
  loading?: 'eager' | 'lazy';
}) => (
  <Box display="flex" alignItems="center" gap={2}>
    <Suspense fallback={<LoadingIndicator size={20} message={''} />}>
      <CoverImage
        src={track.coverImage}
        sx={{ width: 50, height: 50 }}
        {...(loading ? { imgProps: { loading } } : {})}
      />
    </Suspense>
    <Box>
      <Typography
        variant="subtitle1"
        fontWeight={600}
        data-testid={`track-item-${track.id}-title`}
      >
        {track.title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        data-testid={`track-item-${track.id}-artist`}
      >
        {track.artist}
      </Typography>
      {track.album && (
        <Typography variant="caption" color="text.secondary">
          {track.album}
        </Typography>
      )}
      <Box mt={0.5} display="flex" flexWrap="wrap" gap={0.5}>
        {track.genres?.map((genre: string) => (
          <Chip
            key={genre}
            label={genre}
            size="small"
            data-testid={`track-genre-${track.id}-${genre}`}
          />
        ))}
      </Box>
    </Box>
  </Box>
);

export default TrackInfo;
