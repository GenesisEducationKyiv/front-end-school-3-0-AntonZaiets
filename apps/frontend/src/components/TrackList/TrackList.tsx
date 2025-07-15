import Grid from '@/ui/Grid/Grid.tsx';
import TrackItem from '../TrackItem/TrackItem.tsx';
import TrackListSkeleton from './TrackListSkeleton';
import { FC } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  genres: string[];
  audioFile?: string;
}

interface TrackListProps {
  tracksData: { tracks: Track[] };
  isSelectMode: boolean;
  selectedTracks: string[];
  onSelectTrack: (id: string) => void;
  onEditTrack: (id: string) => void;
  onDeleteTrack: (id: string) => void;
  isLoading: boolean;
}

const TrackList: FC<TrackListProps> = ({
  tracksData,
  isSelectMode,
  selectedTracks,
  onSelectTrack,
  onEditTrack,
  onDeleteTrack,
  isLoading,
}) => {
  if (isLoading) return <TrackListSkeleton />;

  return (
    <Grid container spacing={3} data-testid="tracks-list" direction="column">
      {tracksData?.tracks.map((track, idx) => (
        <Grid key={track.id} data-testid={`track-item-${track.id}`}>
          <TrackItem
            track={track}
            onEdit={() => onEditTrack(track.id)}
            onDelete={() => onDeleteTrack(track.id)}
            isSelectMode={isSelectMode}
            isSelected={selectedTracks.includes(track.id)}
            onSelect={() => onSelectTrack(track.id)}
            isLoading={false}
            data-testid={{
              title: `track-item-${track.id}-title`,
              artist: `track-item-${track.id}-artist`,
              edit: `edit-track-${track.id}`,
              delete: `delete-track-${track.id}`,
            }}
            loading={idx === 0 ? 'eager' : undefined}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TrackList;
