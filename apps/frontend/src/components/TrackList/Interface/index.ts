import { TFetchTracksResponse } from '../../../types/types.ts';

export interface TracksListSectionProps {
  tracksData: TFetchTracksResponse;
  isSelectMode: boolean;
  selectedTracks: string[];
  onSelectTrack: (value: string) => void;
  onEditTrack: (value: string) => void;
  onDeleteTrack: (value: string) => void;
}
