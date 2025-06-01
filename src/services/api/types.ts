import { ITrack } from '../../types/types.ts';
import { z } from 'zod';
import { TrackPayloadSchema } from '../../schemas/trackSchemas.ts';

export interface TFetchTracksResponse {
  tracks: ITrack[];
  totalPages: number;
  currentPage: number;
}

export type TApiTrackPayload = z.infer<typeof TrackPayloadSchema>;
