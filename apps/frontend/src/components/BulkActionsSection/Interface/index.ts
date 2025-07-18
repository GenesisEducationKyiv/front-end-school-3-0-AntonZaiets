import { TFetchTracksResponse } from '../../../types/types.ts';

export interface BulkActionsSectionProps {
  isSelectMode: boolean;
  selectedTracks: string[];
  onToggleSelectAll: () => void;
  onBulkDelete: () => void;
  tracksData: TFetchTracksResponse;
}
