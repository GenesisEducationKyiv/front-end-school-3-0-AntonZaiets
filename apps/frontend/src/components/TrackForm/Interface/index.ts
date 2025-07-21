import { BaseTrack, TrackFormData } from '../../../types/types.ts';

export interface ITrackForm {
  open?: boolean;
  onClose?: () => void;
  track?: BaseTrack;
  genres?: string[];
  onSubmit: (data: TrackFormData) => void;
}

export const defaultGenres: string[] = [];
