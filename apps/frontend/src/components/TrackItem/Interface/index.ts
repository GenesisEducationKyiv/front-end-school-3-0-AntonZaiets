import { BaseTrack } from '../../../types/types.ts';

export interface ITrackItem {
  track: BaseTrack;
  onEdit: () => void;
  onDelete: () => void;
  isSelectMode: boolean;
  isSelected: boolean;
  onSelect: () => void;
}
