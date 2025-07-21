import { Result } from 'neverthrow';

export interface BaseTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  genres: string[];
  coverImage?: string;
  audioFile?: string;
  slug?: string;
  file?: unknown;
}

export interface TFetchTracksResponse {
  tracks: BaseTrack[];
  totalPages: number;
  currentPage: number;
}

export type TrackFormData = Pick<
  BaseTrack,
  'title' | 'artist' | 'album' | 'genres' | 'coverImage'
>;

export type AsyncResult<T> = Promise<Result<T, Error>>;
