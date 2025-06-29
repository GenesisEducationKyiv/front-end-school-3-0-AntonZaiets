import { Result } from 'neverthrow';

export interface ITrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  genres: string[];
  coverImage?: string;
  audioFile?: string;
  file?: unknown;
}

export interface TTrackFormData {
  title: string;
  artist: string;
  album?: string;
  genres: string[];
  coverImage?: string;
}

export type AsyncResult<T> = Promise<Result<T, Error>>;
