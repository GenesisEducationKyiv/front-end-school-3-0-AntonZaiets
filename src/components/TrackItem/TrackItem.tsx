import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import TrackInfo from './components/TrackInfo/TrackInfo.tsx';
import TrackActions from './components/TrackActions/TrackActions.tsx';
import TrackAudioPlayer from './components/TrackAudioPlayer/TrackAudioPlayer.tsx';
import TrackCheckbox from './components/TrackCheckbox/TrackCheckbox.tsx';
import UploadModalHandler from './components/UploadModalHandler/UploadModalHandler.tsx';
import { getTemporaryLink } from '../../services/api/dropboxService.ts';
import { ITrackItem } from './Interface';
import { AsyncResult } from '../../types/types.ts';
import { ok } from 'neverthrow';
import { handleError } from '../../services/api/handleError.ts';

const TrackItem = ({
  track,
  onEdit,
  onDelete,
  isSelectMode,
  isSelected,
  onSelect,
}: ITrackItem) => {
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

  return (
    <Card
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
      }}
    >
      <TrackCheckbox
        isSelectMode={isSelectMode}
        isSelected={isSelected}
        onSelect={onSelect}
        trackId={track.id}
      />
      <TrackInfo track={track} />
      <TrackAudioPlayer audioUrl={audioUrl} trackId={track.id} />
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
