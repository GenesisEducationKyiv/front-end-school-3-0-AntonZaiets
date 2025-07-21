import React, { FC, Suspense, useState, useEffect } from 'react';
import Card from '@/ui/Card/Card.tsx';
import TrackInfo from './components/TrackInfo/TrackInfo.tsx';
import TrackActions from './components/TrackActions/TrackActions.tsx';
import TrackCheckbox from './components/TrackCheckbox/TrackCheckbox.tsx';
import { getTemporaryLink } from '@/services/api/dropboxService.ts';
import { AsyncResult } from '@/types/types.ts';
import { ok } from 'neverthrow';
import { handleError } from '@/services/api/handleError.ts';
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator.tsx';
import UploadModalHandler from './components/UploadModalHandler/UploadModalHandler';
import TrackItemSkeleton from './TrackItemSkeleton';

const TrackAudioPlayer = React.lazy(
  () => import('./components/TrackAudioPlayer/TrackAudioPlayer')
);

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  genres: string[];
  audioFile?: string;
}

const TrackItem: FC<{
  track: Track;
  isSelectMode: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isLoading?: boolean;
  loading?: 'eager' | 'lazy';
}> = ({
  track,
  isSelectMode,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  isLoading = false,
  loading,
}) => {
  const [showUpload, setShowUpload] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudioUrl = async (): AsyncResult<void> => {
      if (!track.audioFile) {
        return ok(undefined);
      }
      try {
        const tempLink: string = await getTemporaryLink(`${track.id}.mp3`);
        setAudioUrl(tempLink);
        return ok(undefined);
      } catch (e) {
        return handleError(e);
      }
    };
    fetchAudioUrl();
  }, [track.audioFile, track.id]);

  if (isLoading) return <TrackItemSkeleton />;

  return (
    <Card
      variant="elevated"
      elevation={1}
      data-testid={`track-item-${track.id}`}
      sx={{
        position: 'relative',
        opacity: track.audioFile ? 1 : 0.7,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        flexWrap: 'wrap',
        '&:hover': {
          boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
        },
      }}
    >
      <TrackCheckbox
        isSelectMode={isSelectMode}
        isSelected={isSelected}
        onSelect={onSelect}
        trackId={track.id}
      />
      <TrackInfo track={track} loading={loading} />
      <Suspense fallback={<LoadingIndicator size={20} message={''} />}>
        <TrackAudioPlayer audioUrl={audioUrl} trackId={track.id} />
      </Suspense>
      <TrackActions
        onEdit={onEdit}
        onDelete={onDelete}
        onSelect={onSelect}
        isSelectMode={isSelectMode}
        isSelected={isSelected}
        trackId={track.id}
        setShowUpload={setShowUpload}
      />
      <UploadModalHandler
        showUpload={showUpload}
        setShowUpload={setShowUpload}
        trackId={track.id}
        setAudioUrl={setAudioUrl}
      />
    </Card>
  );
};

export default TrackItem;
