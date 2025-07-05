import { ITrack } from '@/types/types.ts';

export interface TFetchTracksResponse {
  tracks: ITrack[];
  totalPages: number;
  currentPage: number;
}

export interface TApiTrackPayload {
  title: string;
  artist: string;
  album?: string;
  genres: string[];
  coverImage?: string;
}
